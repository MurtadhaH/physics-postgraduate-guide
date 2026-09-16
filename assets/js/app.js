/**
 * Physics Postgraduate Guide — Application Engine
 * Designed & Developed by Murtadha Altufaily
 * Copyright © 2026 Murtadha Altufaily. All Rights Reserved.
 * Unauthorized copying, redistribution, modification, or republication is not permitted.
 */

"use strict";

(() => {
  const views = [...document.querySelectorAll("[data-view]")];
  const navLinks = [...document.querySelectorAll("[data-nav]")];
  const menuButton = document.getElementById("menuButton");
  const mobileMenu = document.getElementById("mobileMenu");
  const degreeChip = document.getElementById("degreeChip");
  const degreeChipValue = document.getElementById("degreeChipValue");
  const degreeCards = [...document.querySelectorAll(".degree-option")];
  const degreeNextButton = document.getElementById("degreeNextButton");
  const degreeNextText = document.getElementById("degreeNextText");
  const changeDegreeButtons = [...document.querySelectorAll("[data-change-degree]")];
  const currentDegreeLabels = [...document.querySelectorAll("[data-current-degree]")];

  const proceduresKicker = document.getElementById("proceduresKicker");
  const proceduresTitle = document.getElementById("proceduresTitle");
  const proceduresDescription = document.getElementById("proceduresDescription");
  const procedurePhases = document.getElementById("procedurePhases");
  const proceduresContent = document.getElementById("proceduresContent");
  const procedurePhaseKicker = document.getElementById("procedurePhaseKicker");
  const procedurePhaseTitle = document.getElementById("procedurePhaseTitle");
  const procedurePhaseDescription = document.getElementById("procedurePhaseDescription");
  const procedureCountLabel = document.getElementById("procedureCountLabel");

  const templatesKicker = document.getElementById("templatesKicker");
  const templatesTitle = document.getElementById("templatesTitle");
  const templatesDescription = document.getElementById("templatesDescription");
  const templatesOverview = document.getElementById("templatesOverview");
  const templateSearch = document.getElementById("templateSearch");
  const templatePhaseFilters = document.getElementById("templatePhaseFilters");
  const templatesContent = document.getElementById("templatesContent");
  const guidanceSearch = document.getElementById("guidanceSearch");
  const guidanceGrid = document.getElementById("guidanceGrid");

  const developerOverlay = document.getElementById("developerOverlay");
  const footerDevButton = document.getElementById("footerDevButton");
  const mobileDevButton = document.getElementById("mobileDevButton");
  const developerCloseButtons = [...document.querySelectorAll("[data-close-developer]")];

  const choiceDialog = document.getElementById("choiceDialog");
  const choiceDialogText = document.getElementById("choiceDialogText");
  const chooseDegreeButton = document.getElementById("chooseDegreeButton");
  const closeChoiceDialog = document.getElementById("closeChoiceDialog");

  const completionDialog = document.getElementById("completionDialog");
  const completionDialogTitle = document.getElementById("completionDialogTitle");
  const completionDialogText = document.getElementById("completionDialogText");
  const completionDialogStep = document.getElementById("completionDialogStep");
  const confirmCompletionButton = document.getElementById("confirmCompletionButton");
  const cancelCompletionButton = document.getElementById("cancelCompletionButton");

  const fileDialog = document.getElementById("fileDialog");
  const fileDialogTitle = document.getElementById("fileDialogTitle");
  const fileDialogText = document.getElementById("fileDialogText");
  const fileDialogName = document.getElementById("fileDialogName");
  const closeFileDialogButton = document.getElementById("closeFileDialogButton");

  const data = window.SITE_DATA || { procedures: {}, templates: {}, guidance: [] };
  const degreeNames = { master: "الماجستير", phd: "الدكتوراه" };
  const restrictedRoutes = new Set(["procedures", "templates"]);
  const routeNames = { procedures: "الإجراءات", templates: "النماذج" };
  const progressStorageKey = "physicsGuideProcedureProgressV1";

  const procedureConfig = data.procedures?.config || {};
  const procedurePhasesData = Array.isArray(procedureConfig.phases) ? procedureConfig.phases : [];
  const procedureLabels = procedureConfig.labels || {};
  const templateConfig = data.templates?.config || {};
  const templateLabels = templateConfig.labels || {};
  const templateTypeLabels = templateConfig.typeLabels || {};

  let selectedDegree = localStorage.getItem("physicsGuideDegree") || null;
  if (!degreeNames[selectedDegree]) selectedDegree = null;

  let currentProcedurePhase = procedurePhasesData[0]?.id || "before";
  let currentTemplatePhase = "all";
  let pendingRoute = null;
  let pendingCompletion = null;

  function escapeHTML(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function escapeAttribute(value) {
    return escapeHTML(value);
  }

  function parseHash() {
    const raw = location.hash.replace(/^#\/?/, "");
    const [routePart = "home", anchorPart = ""] = raw.split("#", 2);
    const route = ["home", "procedures", "templates", "guidance"].includes(routePart)
      ? routePart
      : "home";

    let anchor = "";
    if (anchorPart) {
      try { anchor = decodeURIComponent(anchorPart); }
      catch { anchor = anchorPart; }
    }

    return { route, anchor };
  }

  function normalizeRoute() {
    return parseHash().route;
  }

  function setRoute(route, { replace = false, anchor = "" } = {}) {
    const suffix = anchor ? `#${encodeURIComponent(anchor)}` : "";
    const hash = `#/${route}${suffix}`;

    if (replace) {
      history.replaceState(null, "", hash);
      renderRoute();
    } else if (location.hash !== hash) {
      location.hash = hash;
    } else {
      renderRoute();
    }
  }

  function scrollToRouteAnchor(anchor) {
    if (!anchor) return;

    window.requestAnimationFrame(() => {
      const target = document.getElementById(anchor);
      if (!target) return;
      target.scrollIntoView({ behavior: "smooth", block: "start" });

      if (target.matches(".guidance-card, .guidance-section")) {
        target.classList.add("is-targeted");
        window.setTimeout(() => target.classList.remove("is-targeted"), 1500);
      }

      if (target.matches(".procedure-step")) {
        const summary = target.querySelector(".procedure-step__summary");
        const details = target.querySelector(".procedure-step__details");
        if (summary && details) {
          summary.setAttribute("aria-expanded", "true");
          details.hidden = false;
          target.classList.add("is-open");
        }
        target.classList.add("is-targeted");
        window.setTimeout(() => target.classList.remove("is-targeted"), 1800);
      }
    });
  }

  function showDegreeRequired(route) {
    pendingRoute = restrictedRoutes.has(route) ? route : "procedures";

    if (choiceDialogText) {
      const name = routeNames[pendingRoute] || "هذا القسم";
      choiceDialogText.textContent = `يجب تحديد الماجستير أو الدكتوراه قبل فتح ${name}.`;
    }

    closeMobileMenu();

    if (choiceDialog?.showModal && !choiceDialog.open) {
      choiceDialog.showModal();
    }
  }

  function hideDegreeRequired() {
    if (choiceDialog?.open) choiceDialog.close();
  }

  function cancelDegreeRequired() {
    hideDegreeRequired();
    pendingRoute = null;
    updateNextButton();
  }

  function requestRoute(route, options = {}) {
    if (restrictedRoutes.has(route) && !selectedDegree) {
      showDegreeRequired(route);
      return false;
    }

    setRoute(route, options);
    return true;
  }

  function renderRoute() {
    let { route, anchor } = parseHash();

    if (restrictedRoutes.has(route) && !selectedDegree) {
      pendingRoute = route;
      history.replaceState(null, "", "#/home");
      route = "home";
      anchor = "";
      window.setTimeout(() => showDegreeRequired(pendingRoute), 0);
    }

    views.forEach(view => {
      const active = view.dataset.view === route;
      view.hidden = !active;
      view.classList.toggle("is-active", active);
    });

    navLinks.forEach(link => {
      const active = link.dataset.nav === route;
      link.classList.toggle("is-active", active);
      if (active) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });

    document.body.dataset.route = route;
    closeMobileMenu();
    window.scrollTo({ top: 0, behavior: "auto" });

    if (route === "procedures") renderProcedures();
    if (route === "templates") renderTemplates();
    if (route === "guidance") renderGuidance(guidanceSearch?.value || "");

    scrollToRouteAnchor(anchor);
  }

  function openMobileMenu() {
    if (!mobileMenu || !menuButton) return;
    mobileMenu.hidden = false;
    menuButton.setAttribute("aria-expanded", "true");
    document.body.classList.add("menu-open");
  }

  function closeMobileMenu() {
    if (!mobileMenu || !menuButton) return;
    mobileMenu.hidden = true;
    menuButton.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
  }

  function toggleMobileMenu() {
    if (mobileMenu?.hidden) openMobileMenu();
    else closeMobileMenu();
  }

  function updateNextButton() {
    if (!degreeNextButton) return;

    degreeNextButton.hidden = !selectedDegree;

    if (degreeNextText) {
      if (pendingRoute === "templates") degreeNextText.textContent = "التالي إلى النماذج";
      else if (pendingRoute === "procedures") degreeNextText.textContent = "التالي إلى الإجراءات";
      else degreeNextText.textContent = "التالي";
    }
  }

  function updateDegreeUI() {
    const label = selectedDegree ? degreeNames[selectedDegree] : "غير محددة";
    if (degreeChipValue) degreeChipValue.textContent = label;
    currentDegreeLabels.forEach(el => { el.textContent = label; });
    document.body.dataset.degree = selectedDegree || "none";

    degreeCards.forEach(card => {
      const active = card.dataset.degree === selectedDegree;
      card.setAttribute("aria-pressed", active ? "true" : "false");
    });

    updateNextButton();
  }

  function selectDegree(degree) {
    if (!degreeNames[degree]) return;
    selectedDegree = degree;
    localStorage.setItem("physicsGuideDegree", degree);
    updateDegreeUI();
    degreeNextButton?.focus({ preventScroll: true });
  }

  function emptyState(icon, title, text) {
    return `
      <span class="empty-state__icon" aria-hidden="true">${escapeHTML(icon)}</span>
      <h2>${escapeHTML(title)}</h2>
      <p>${escapeHTML(text)}</p>
    `;
  }

  function getProcedureProgress() {
    try {
      const parsed = JSON.parse(localStorage.getItem(progressStorageKey) || "{}");
      return parsed && typeof parsed === "object" ? parsed : {};
    } catch {
      return {};
    }
  }

  function saveProcedureProgress(progress) {
    localStorage.setItem(progressStorageKey, JSON.stringify(progress));
  }

  function completionKey(degree, phaseId, stepId) {
    return `${degree}:${phaseId}:${stepId}`;
  }

  function isProcedureComplete(degree, phaseId, stepId) {
    if (!degree || !phaseId || !stepId) return false;
    return getProcedureProgress()[completionKey(degree, phaseId, stepId)] === true;
  }

  function setProcedureComplete(degree, phaseId, stepId, complete) {
    const progress = getProcedureProgress();
    const key = completionKey(degree, phaseId, stepId);

    if (complete) progress[key] = true;
    else delete progress[key];

    saveProcedureProgress(progress);
  }

  function getPhaseInfo(phaseId) {
    return procedurePhasesData.find(phase => phase.id === phaseId) || procedurePhasesData[0] || {
      id: phaseId || "before",
      number: "01",
      title: "الإجراءات",
      shortDescription: "",
      description: ""
    };
  }

  function getPhaseItems(phaseId) {
    if (!selectedDegree) return [];
    const items = data.procedures?.[selectedDegree]?.[phaseId];
    return Array.isArray(items) ? items : [];
  }

  function getStepId(item, index, phaseId) {
    return String(item?.id || `${phaseId}-step-${index + 1}`);
  }

  function getPhaseCompletion(phaseId) {
    const items = getPhaseItems(phaseId);
    const complete = items.reduce((count, item, index) => {
      const stepId = getStepId(item, index, phaseId);
      return count + (isProcedureComplete(selectedDegree, phaseId, stepId) ? 1 : 0);
    }, 0);

    return { complete, total: items.length };
  }

  function renderProcedureShell() {
    const page = procedureConfig.page || {};
    if (proceduresKicker) proceduresKicker.textContent = page.kicker || "المسار الدراسي";
    if (proceduresTitle) proceduresTitle.textContent = page.title || "الإجراءات";
    if (proceduresDescription) proceduresDescription.textContent = page.description || "";

    if (!procedurePhases) return;

    procedurePhases.style.setProperty("--phase-count", String(Math.max(procedurePhasesData.length, 1)));

    procedurePhases.innerHTML = procedurePhasesData.map((phase, index) => {
      const active = phase.id === currentProcedurePhase;
      const progress = selectedDegree ? getPhaseCompletion(phase.id) : { complete: 0, total: 0 };
      const countText = progress.total ? `${progress.complete}/${progress.total}` : "—";

      return `
        <button
          type="button"
          class="procedure-phase${active ? " is-active" : ""}"
          data-procedure-phase="${escapeAttribute(phase.id)}"
          role="tab"
          aria-selected="${active ? "true" : "false"}"
        >
          <span class="procedure-phase__number">${escapeHTML(phase.number || String(index + 1).padStart(2, "0"))}</span>
          <span class="procedure-phase__copy">
            <strong>${escapeHTML(phase.title || phase.id)}</strong>
            ${phase.shortDescription ? `<small>${escapeHTML(phase.shortDescription)}</small>` : ""}
          </span>
          <span class="procedure-phase__count" aria-label="التقدم في المرحلة">${escapeHTML(countText)}</span>
        </button>
      `;
    }).join("");
  }

  function procedureActionIcon(type) {
    if (type === "download") {
      return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v11"></path><path d="m8 10 4 4 4-4"></path><path d="M5 18h14"></path></svg>`;
    }

    if (type === "goto" || type === "route") {
      return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13"></path><path d="m14 7 5 5-5 5"></path></svg>`;
    }

    return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 5h5v5"></path><path d="M10 14 19 5"></path><path d="M19 14v5H5V5h5"></path></svg>`;
  }

  function getDocumentById(documentId) {
    if (!documentId || !selectedDegree) return null;
    const degreeDocuments = data.documents?.[selectedDegree];
    if (!degreeDocuments || typeof degreeDocuments !== "object") return null;

    for (const phaseDocuments of Object.values(degreeDocuments)) {
      if (!Array.isArray(phaseDocuments)) continue;
      const documentItem = phaseDocuments.find(item => item?.id === documentId);
      if (documentItem) return documentItem;
    }

    return null;
  }

  function resolveProcedureAction(action) {
    if (!action || typeof action !== "object") return {};

    if (action.documentId) {
      const documentItem = getDocumentById(action.documentId);
      if (!documentItem) return { ...action, documentMissing: true };

      const file = documentItem.file || "";
      const folder = documentItem.folder || "";
      const url = action.url || (file ? `${folder}${file}` : "");

      return {
        ...action,
        label: action.label || documentItem.title || "تنزيل النموذج",
        url,
        filename: action.filename || file || "",
        documentTitle: documentItem.title || action.label || "الملف",
        documentMissing: !file
      };
    }

    return {
      ...action,
      documentTitle: action.documentTitle || action.label || "الملف",
      documentMissing: action.type === "download" && !action.url
    };
  }

  function renderProcedureAction(action, index) {
    const resolved = resolveProcedureAction(action || {});
    const type = resolved.type || "link";
    const label = resolved.label || (type === "download" ? "تنزيل" : "فتح");
    const style = ["primary", "secondary", "quiet"].includes(resolved.style) ? resolved.style : "secondary";
    const missingClass = type === "download" && resolved.documentMissing ? " procedure-action--missing" : "";
    const className = `procedure-action procedure-action--${style}${missingClass}`;
    const icon = procedureActionIcon(type);

    if (type === "download") {
      return `
        <button
          class="${className}"
          type="button"
          data-procedure-action="download"
          data-file-url="${escapeAttribute(resolved.url || "")}"
          data-file-name="${escapeAttribute(resolved.filename || "")}"
          data-document-title="${escapeAttribute(resolved.documentTitle || label)}"
          data-file-missing="${resolved.documentMissing ? "true" : "false"}"
          data-action-index="${index}"
        >
          <span class="procedure-action__icon">${icon}</span>
          <span>${escapeHTML(label)}</span>
        </button>
      `;
    }

    if (type === "goto" || type === "route") {
      if (!resolved.route) return "";
      return `
        <button
          class="${className}"
          type="button"
          data-procedure-action="goto"
          data-route="${escapeAttribute(resolved.route)}"
          data-section="${escapeAttribute(resolved.section || resolved.anchor || "")}"
          data-action-index="${index}"
        >
          <span class="procedure-action__icon">${icon}</span>
          <span>${escapeHTML(label)}</span>
        </button>
      `;
    }

    if (!resolved.url) return "";
    const target = resolved.target === "_blank" ? "_blank" : "_self";
    const rel = target === "_blank" ? " rel=\"noopener noreferrer\"" : "";
    return `
      <a class="${className}" href="${escapeAttribute(resolved.url)}" target="${target}"${rel} data-action-index="${index}">
        <span class="procedure-action__icon">${icon}</span>
        <span>${escapeHTML(label)}</span>
      </a>
    `;
  }

  function renderProcedureBadges(item) {
    const badges = Array.isArray(item?.badges) ? item.badges : [];
    if (!badges.length) return "";

    const allowedTones = new Set(["blue", "green", "amber", "red", "gray"]);
    return `
      <span class="procedure-step__badges" aria-label="تصنيفات الخطوة">
        ${badges.map(badge => {
          const label = typeof badge === "string" ? badge : badge?.label;
          if (!label) return "";
          const rawTone = typeof badge === "object" ? badge?.tone : "gray";
          const tone = allowedTones.has(rawTone) ? rawTone : "gray";
          return `<span class="procedure-badge procedure-badge--${tone}">${escapeHTML(label)}</span>`;
        }).join("")}
      </span>
    `;
  }

  function renderProcedures({ reopenStepId = "", justCompletedId = "" } = {}) {
    if (!procedurePhasesData.some(phase => phase.id === currentProcedurePhase)) {
      currentProcedurePhase = procedurePhasesData[0]?.id || "before";
    }

    renderProcedureShell();

    const phaseInfo = getPhaseInfo(currentProcedurePhase);
    if (procedurePhaseKicker) procedurePhaseKicker.textContent = `المرحلة ${phaseInfo.number || ""}`.trim();
    if (procedurePhaseTitle) procedurePhaseTitle.textContent = phaseInfo.title || "";
    if (procedurePhaseDescription) procedurePhaseDescription.textContent = phaseInfo.description || "";

    if (!proceduresContent) return;

    if (!selectedDegree) {
      if (procedureCountLabel) procedureCountLabel.textContent = "—";
      proceduresContent.innerHTML = `
        <div class="procedure-empty">
          <span class="procedure-empty__icon" aria-hidden="true">!</span>
          <div>
            <h3>اختر المرحلة الدراسية أولًا</h3>
            <p>اختر الماجستير أو الدكتوراه لعرض الإجراءات الخاصة بمرحلتك.</p>
          </div>
        </div>
      `;
      return;
    }

    const items = getPhaseItems(currentProcedurePhase);
    const phaseProgress = getPhaseCompletion(currentProcedurePhase);

    if (procedureCountLabel) {
      if (!items.length) {
        procedureCountLabel.textContent = "0 إجراء";
      } else {
        procedureCountLabel.textContent = `${phaseProgress.complete} من ${phaseProgress.total} مكتمل`;
      }
    }

    if (!items.length) {
      proceduresContent.innerHTML = `
        <div class="procedure-empty">
          <span class="procedure-empty__icon" aria-hidden="true">${escapeHTML(phaseInfo.number || "—")}</span>
          <div>
            <h3>${escapeHTML(procedureLabels.noProceduresTitle || "لم تُضف الإجراءات الرسمية بعد")}</h3>
            <p>${escapeHTML(procedureLabels.noProceduresText || "ستظهر الإجراءات هنا عند إضافتها إلى ملف البيانات.")}</p>
          </div>
        </div>
      `;
      return;
    }

    proceduresContent.innerHTML = `
      <div class="procedure-progress" aria-label="تقدم المرحلة">
        <div class="procedure-progress__copy">
          <strong>${phaseProgress.complete} من ${phaseProgress.total}</strong>
          <span>خطوات مكتملة</span>
        </div>
        <div class="procedure-progress__track" aria-hidden="true">
          <span style="width:${phaseProgress.total ? (phaseProgress.complete / phaseProgress.total) * 100 : 0}%"></span>
        </div>
      </div>

      <div class="procedure-timeline">
        ${items.map((item, index) => {
          const requirements = Array.isArray(item.requirements) ? item.requirements : [];
          const actions = Array.isArray(item.actions) ? item.actions : [];
          const stepNumber = String(index + 1).padStart(2, "0");
          const stepId = getStepId(item, index, currentProcedurePhase);
          const summary = item.summary || item.description || "";
          const completed = isProcedureComplete(selectedDegree, currentProcedurePhase, stepId);
          const safeTitle = item.title || `الخطوة ${stepNumber}`;

          return `
            <article
              id="${escapeAttribute(stepId)}"
              class="procedure-step${completed ? " is-completed" : ""}${stepId === justCompletedId ? " is-just-completed" : ""}"
              data-step-id="${escapeAttribute(stepId)}"
              data-step-index="${index}"
            >
              <span class="procedure-step__rail" aria-hidden="true"></span>

              <div class="procedure-step__row">
                <button
                  class="procedure-step__check"
                  type="button"
                  role="checkbox"
                  aria-checked="${completed ? "true" : "false"}"
                  aria-label="${escapeAttribute(completed ? `إلغاء اكتمال ${safeTitle}` : `${procedureLabels.markComplete || "تحديد الخطوة كمكتملة"}: ${safeTitle}`)}"
                  data-complete-step
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="m6.5 12.5 3.5 3.5 7.5-8"></path>
                  </svg>
                </button>

                <button class="procedure-step__summary" type="button" aria-expanded="false">
                  <span class="procedure-step__index">
                    <small>${escapeHTML(procedureLabels.step || "الخطوة")}</small>
                    <strong>${stepNumber}</strong>
                  </span>

                  <span class="procedure-step__title">
                    <span class="procedure-step__title-line">
                      <strong>${escapeHTML(safeTitle)}</strong>
                      ${completed ? `<em>${escapeHTML(procedureLabels.completed || "مكتمل")}</em>` : ""}
                    </span>
                    ${renderProcedureBadges(item)}
                    ${summary ? `<small>${escapeHTML(summary)}</small>` : ""}
                  </span>

                  <span class="procedure-step__status">
                    ${actions.length ? `<b>${actions.length}</b><small>إجراء</small>` : `<small>${escapeHTML(procedureLabels.details || "التفاصيل")}</small>`}
                    <i aria-hidden="true"></i>
                  </span>
                </button>
              </div>

              <div class="procedure-step__details" hidden>
                ${item.description && item.description !== summary ? `
                  <div class="procedure-detail-block">
                    <span class="procedure-detail-block__label">${escapeHTML(procedureLabels.details || "التفاصيل")}</span>
                    <p>${escapeHTML(item.description)}</p>
                  </div>
                ` : ""}

                ${requirements.length ? `
                  <div class="procedure-detail-block">
                    <span class="procedure-detail-block__label">${escapeHTML(procedureLabels.requirements || "المطلوب")}</span>
                    <ul class="procedure-requirements">
                      ${requirements.map(requirement => `<li>${escapeHTML(requirement)}</li>`).join("")}
                    </ul>
                  </div>
                ` : ""}

                ${item.note ? `
                  <div class="procedure-note">
                    <span aria-hidden="true">i</span>
                    <p>${escapeHTML(item.note)}</p>
                  </div>
                ` : ""}

                ${actions.length ? `
                  <div class="procedure-actions" aria-label="إجراءات الخطوة">
                    ${actions.map((action, actionIndex) => renderProcedureAction(action, actionIndex)).join("")}
                  </div>
                ` : ""}

                ${!item.description && !requirements.length && !item.note && !actions.length ? `
                  <div class="procedure-detail-block procedure-detail-block--muted">
                    <p>ستُضاف تفاصيل هذه الخطوة عند إدخال الإجراء الرسمي.</p>
                  </div>
                ` : ""}
              </div>
            </article>
          `;
        }).join("")}
      </div>
    `;

    if (reopenStepId) {
      const step = proceduresContent.querySelector(`[data-step-id="${CSS.escape(reopenStepId)}"]`);
      const summaryButton = step?.querySelector(".procedure-step__summary");
      const details = step?.querySelector(".procedure-step__details");
      if (step && summaryButton && details) {
        step.classList.add("is-open");
        summaryButton.setAttribute("aria-expanded", "true");
        details.hidden = false;
      }
    }

    if (justCompletedId) {
      const completedStep = proceduresContent.querySelector(`[data-step-id="${CSS.escape(justCompletedId)}"]`);
      if (completedStep) {
        window.setTimeout(() => completedStep.classList.remove("is-just-completed"), 900);
      }
    }
  }

  function openCompletionDialog(stepElement) {
    if (!stepElement || !selectedDegree) return;

    const stepId = stepElement.dataset.stepId;
    const stepIndex = Number(stepElement.dataset.stepIndex || 0);
    const items = getPhaseItems(currentProcedurePhase);
    const item = items[stepIndex];
    if (!item || !stepId) return;

    const currentlyComplete = isProcedureComplete(selectedDegree, currentProcedurePhase, stepId);
    const nextComplete = !currentlyComplete;
    const title = item.title || `الخطوة ${stepIndex + 1}`;

    pendingCompletion = {
      degree: selectedDegree,
      phaseId: currentProcedurePhase,
      stepId,
      nextComplete,
      reopenStepId: stepElement.classList.contains("is-open") ? stepId : ""
    };

    if (completionDialogTitle) {
      completionDialogTitle.textContent = nextComplete ? "تأكيد إكمال الخطوة" : "إلغاء علامة الاكتمال";
    }

    if (completionDialogText) {
      completionDialogText.textContent = nextComplete
        ? "هل أنت متأكد من أنك أنهيت هذه الخطوة؟ يمكنك الرجوع إليها لاحقًا في أي وقت."
        : "هل تريد إعادة هذه الخطوة إلى حالة غير مكتملة؟";
    }

    if (completionDialogStep) {
      completionDialogStep.hidden = false;
      completionDialogStep.textContent = title;
    }

    if (confirmCompletionButton) {
      confirmCompletionButton.textContent = nextComplete ? "نعم، اكتملت" : "نعم، أعد فتحها";
    }

    if (completionDialog?.showModal && !completionDialog.open) {
      completionDialog.showModal();
    }
  }

  function closeCompletionDialog() {
    if (completionDialog?.open) completionDialog.close();
    pendingCompletion = null;
  }

  function confirmProcedureCompletion() {
    if (!pendingCompletion) return;

    const state = { ...pendingCompletion };
    setProcedureComplete(state.degree, state.phaseId, state.stepId, state.nextComplete);
    closeCompletionDialog();

    renderProcedures({
      reopenStepId: state.reopenStepId,
      justCompletedId: state.nextComplete ? state.stepId : ""
    });
  }

  function openFileDialog(documentTitle, message = "لم يتم رفع هذا الملف بعد.") {
    if (fileDialogTitle) fileDialogTitle.textContent = "الملف غير متوفر";
    if (fileDialogText) fileDialogText.textContent = message;

    if (fileDialogName) {
      fileDialogName.hidden = !documentTitle;
      fileDialogName.textContent = documentTitle || "";
    }

    if (fileDialog?.showModal && !fileDialog.open) fileDialog.showModal();
  }

  function closeFileDialog() {
    if (fileDialog?.open) fileDialog.close();
  }

  async function handleProcedureDownload(button) {
    if (!button) return;

    const url = button.dataset.fileUrl || "";
    const filename = button.dataset.fileName || "";
    const documentTitle = button.dataset.documentTitle || "الملف";
    const isMarkedMissing = button.dataset.fileMissing === "true";

    if (isMarkedMissing || !url) {
      openFileDialog(documentTitle, "لم يتم رفع هذا الملف بعد.");
      return;
    }

    const originalDisabled = button.disabled;
    button.disabled = true;
    button.classList.add("is-checking-file");

    try {
      const response = await fetch(url, { method: "HEAD", cache: "no-store" });
      if (!response.ok) {
        openFileDialog(documentTitle, "لم يتم رفع هذا الملف بعد.");
        return;
      }

      const anchor = document.createElement("a");
      anchor.href = url;
      if (filename) anchor.download = filename;
      else anchor.setAttribute("download", "");
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
    } catch {
      openFileDialog(documentTitle, "تعذر الوصول إلى الملف الآن. حاول مرة أخرى.");
    } finally {
      button.classList.remove("is-checking-file");
      button.disabled = originalDisabled;
    }
  }

  function getDegreeDocuments(degree = selectedDegree) {
    if (!degree) return [];
    const degreeDocuments = data.documents?.[degree];
    if (!degreeDocuments || typeof degreeDocuments !== "object") return [];

    const phaseOrder = new Map(procedurePhasesData.map((phase, index) => [phase.id, index]));
    const result = [];

    for (const [phaseId, items] of Object.entries(degreeDocuments)) {
      if (!Array.isArray(items)) continue;
      items.forEach((item, index) => {
        if (!item || typeof item !== "object") return;
        result.push({ ...item, phaseId, documentOrder: index });
      });
    }

    return result.sort((a, b) => {
      const phaseDiff = (phaseOrder.get(a.phaseId) ?? 999) - (phaseOrder.get(b.phaseId) ?? 999);
      return phaseDiff || a.documentOrder - b.documentOrder;
    });
  }

  function getDocumentUsages(documentId, degree = selectedDegree) {
    if (!documentId || !degree) return [];
    const degreeProcedures = data.procedures?.[degree];
    if (!degreeProcedures || typeof degreeProcedures !== "object") return [];

    const usages = [];
    for (const phase of procedurePhasesData) {
      const steps = Array.isArray(degreeProcedures[phase.id]) ? degreeProcedures[phase.id] : [];
      steps.forEach((step, index) => {
        const actions = Array.isArray(step?.actions) ? step.actions : [];
        if (!actions.some(action => action?.documentId === documentId)) return;
        usages.push({
          phaseId: phase.id,
          phaseTitle: phase.title || phase.id,
          stepId: getStepId(step, index, phase.id),
          stepTitle: step.title || `${procedureLabels.step || "الخطوة"} ${index + 1}`
        });
      });
    }

    return usages;
  }

  function templateDocumentIcon(item) {
    const file = String(item?.file || "").toLowerCase();
    if (file.endsWith(".pdf")) return "PDF";
    if (file.endsWith(".doc") || file.endsWith(".docx")) return "DOC";
    if (file.endsWith(".xls") || file.endsWith(".xlsx")) return "XLS";
    return item?.type === "template" ? "TPL" : "DOC";
  }

  function renderTemplateShell(documents) {
    const page = templateConfig.page || {};
    if (templatesKicker) templatesKicker.textContent = page.kicker || "الملفات الرسمية";
    if (templatesTitle) templatesTitle.textContent = page.title || "النماذج";
    if (templatesDescription) templatesDescription.textContent = page.description || "";

    const total = documents.length;
    const available = documents.filter(item => Boolean(item.file)).length;
    const pending = total - available;

    if (templatesOverview) {
      const stats = [
        { label: templateLabels.total || "إجمالي النماذج", value: total, tone: "total" },
        { label: templateLabels.available || "ملفات متوفرة", value: available, tone: "available" },
        { label: templateLabels.pending || "بانتظار الرفع", value: pending, tone: "pending" }
      ];
      templatesOverview.innerHTML = stats.map(stat => `
        <div class="template-stat template-stat--${stat.tone}">
          <strong>${escapeHTML(stat.value)}</strong>
          <span>${escapeHTML(stat.label)}</span>
        </div>
      `).join("");
    }

    if (templatePhaseFilters) {
      const filters = [
        { id: "all", title: templateLabels.all || "الكل", count: total },
        ...procedurePhasesData.map(phase => ({
          id: phase.id,
          title: phase.title || phase.id,
          count: documents.filter(item => item.phaseId === phase.id).length
        }))
      ];

      if (!filters.some(filter => filter.id === currentTemplatePhase)) currentTemplatePhase = "all";

      templatePhaseFilters.innerHTML = filters.map(filter => {
        const active = filter.id === currentTemplatePhase;
        return `
          <button
            type="button"
            class="template-phase-filter${active ? " is-active" : ""}"
            data-template-phase="${escapeAttribute(filter.id)}"
            role="tab"
            aria-selected="${active ? "true" : "false"}"
          >
            <span>${escapeHTML(filter.title)}</span>
            <b>${escapeHTML(filter.count)}</b>
          </button>
        `;
      }).join("");
    }
  }

  function renderTemplates() {
    if (!templatesContent) return;

    if (!selectedDegree) {
      if (templatesOverview) templatesOverview.innerHTML = "";
      if (templatePhaseFilters) templatePhaseFilters.innerHTML = "";
      templatesContent.innerHTML = `<div class="content-card empty-state">${emptyState("DOC", "اختر المرحلة الدراسية أولًا", "اختر الماجستير أو الدكتوراه لعرض النماذج المناسبة.")}</div>`;
      return;
    }

    const documents = getDegreeDocuments();
    renderTemplateShell(documents);

    if (!documents.length) {
      templatesContent.innerHTML = `<div class="content-card empty-state">${emptyState(
        "DOC",
        templateLabels.noDocumentsTitle || "لم تُضف نماذج لهذه المرحلة بعد",
        templateLabels.noDocumentsText || "ستظهر النماذج هنا تلقائيًا عند إضافتها إلى سجل الملفات."
      )}</div>`;
      return;
    }

    const query = (templateSearch?.value || "").trim().toLowerCase();
    const items = documents.filter(item => {
      if (currentTemplatePhase !== "all" && item.phaseId !== currentTemplatePhase) return false;
      const usages = getDocumentUsages(item.id);
      const usageText = usages.map(usage => `${usage.stepTitle} ${usage.phaseTitle}`).join(" ");
      const haystack = `${item.title || ""} ${item.file || ""} ${item.description || ""} ${item.id || ""} ${usageText}`.toLowerCase();
      return !query || haystack.includes(query);
    });

    if (!items.length) {
      templatesContent.innerHTML = `<div class="content-card empty-state templates-empty">${emptyState(
        "⌕",
        templateLabels.noResultsTitle || "لا توجد نتائج",
        templateLabels.noResultsText || "غيّر عبارة البحث أو اختر مرحلة أخرى."
      )}</div>`;
      return;
    }

    templatesContent.innerHTML = `
      <div class="template-catalog">
        ${items.map(item => {
          const phase = getPhaseInfo(item.phaseId);
          const usages = getDocumentUsages(item.id);
          const isAvailable = Boolean(item.file);
          const fileUrl = isAvailable ? `${item.folder || ""}${item.file}` : "";
          const typeLabel = templateTypeLabels[item.type] || templateTypeLabels.document || "ملف";
          const statusLabel = isAvailable
            ? (templateLabels.availableStatus || "متوفر")
            : (templateLabels.pendingStatus || "لم يُرفع بعد");

          return `
            <article class="template-card${isAvailable ? " is-available" : " is-pending"}" data-document-id="${escapeAttribute(item.id || "")}">
              <div class="template-card__head">
                <span class="template-card__icon" aria-hidden="true">${escapeHTML(templateDocumentIcon(item))}</span>
                <div class="template-card__title">
                  <div class="template-card__badges">
                    <span class="template-badge">${escapeHTML(typeLabel)}</span>
                    <span class="template-badge template-badge--phase">${escapeHTML(phase.title || item.phaseId)}</span>
                    <span class="template-status${isAvailable ? " is-available" : " is-pending"}">${escapeHTML(statusLabel)}</span>
                  </div>
                  <h2>${escapeHTML(item.title || "الملف")}</h2>
                  ${item.description ? `<p>${escapeHTML(item.description)}</p>` : ""}
                </div>
              </div>

              <div class="template-card__meta">
                <span>${escapeHTML(templateLabels.usedIn || "يُستخدم في")}</span>
                <strong>${usages.length ? `${usages.length} ${usages.length === 1 ? "إجراء" : "إجراءات"}` : "غير مرتبط بإجراء بعد"}</strong>
                ${item.file ? `<code dir="ltr">${escapeHTML(item.file)}</code>` : `<small>${escapeHTML(templateLabels.notUploaded || "لم يتم رفع هذا الملف بعد.")}</small>`}
              </div>

              ${usages.length ? `
                <div class="template-card__uses" aria-label="الإجراءات المرتبطة">
                  ${usages.map(usage => `
                    <button
                      type="button"
                      class="template-use-link"
                      data-template-procedure
                      data-template-phase="${escapeAttribute(usage.phaseId)}"
                      data-template-step="${escapeAttribute(usage.stepId)}"
                    >
                      <span>${escapeHTML(usage.stepTitle)}</span>
                      <small>${escapeHTML(usage.phaseTitle)}</small>
                    </button>
                  `).join("")}
                </div>
              ` : ""}

              <div class="template-card__actions">
                <button
                  class="template-download${isAvailable ? "" : " is-missing"}"
                  type="button"
                  data-template-download
                  data-file-url="${escapeAttribute(fileUrl)}"
                  data-file-name="${escapeAttribute(item.file || "")}"
                  data-document-title="${escapeAttribute(item.title || "الملف")}"
                  data-file-missing="${isAvailable ? "false" : "true"}"
                >
                  <span class="template-download__icon">${procedureActionIcon("download")}</span>
                  <span>${escapeHTML(templateLabels.download || "تنزيل النموذج")}</span>
                </button>
              </div>
            </article>
          `;
        }).join("")}
      </div>
    `;
  }

  function guidanceBlockHTML(block) {
    if (!block || !block.type) return "";

    if (block.type === "paragraph") {
      return `<div class="guidance-block guidance-block--paragraph"><p>${escapeHTML(block.text || "")}</p></div>`;
    }

    if (block.type === "note") {
      const tone = ["info", "warning", "success"].includes(block.tone) ? block.tone : "info";
      return `
        <aside class="guidance-note guidance-note--${tone}">
          ${block.title ? `<strong>${escapeHTML(block.title)}</strong>` : ""}
          <p>${escapeHTML(block.text || "")}</p>
        </aside>
      `;
    }

    if (block.type === "subsection") {
      const items = Array.isArray(block.items) ? block.items : [];
      return `
        <section class="guidance-subsection">
          <h3>${escapeHTML(block.title || "")}</h3>
          ${block.text ? `<p>${escapeHTML(block.text)}</p>` : ""}
          ${items.length ? `<ul>${items.map(item => `<li>${escapeHTML(item)}</li>`).join("")}</ul>` : ""}
        </section>
      `;
    }

    if (block.type === "specs") {
      const items = Array.isArray(block.items) ? block.items : [];
      return `
        <div class="guidance-specs">
          ${items.map(item => `
            <div class="guidance-spec">
              <dt>${escapeHTML(item.label || "")}</dt>
              <dd>${escapeHTML(item.value || "")}</dd>
            </div>
          `).join("")}
        </div>
      `;
    }

    if (block.type === "links") {
      const items = Array.isArray(block.items) ? block.items : [];
      return `
        <div class="guidance-related">
          ${block.title ? `<h3>${escapeHTML(block.title)}</h3>` : ""}
          <div class="guidance-related__links">
            ${items.map(item => `
              <a href="#/guidance#${encodeURIComponent(item.section || "")}" class="guidance-related__link">
                <span>${escapeHTML(item.label || "")}</span>
                <span aria-hidden="true">←</span>
              </a>
            `).join("")}
          </div>
        </div>
      `;
    }

    const listTypes = new Set(["bullets", "steps", "checklist", "numbered-list"]);
    if (listTypes.has(block.type)) {
      const items = Array.isArray(block.items) ? block.items : [];
      const ordered = block.type === "steps" || block.type === "numbered-list";
      const tag = ordered ? "ol" : "ul";
      return `
        <div class="guidance-list guidance-list--${escapeAttribute(block.type)}">
          ${block.title ? `<h3>${escapeHTML(block.title)}</h3>` : ""}
          <${tag}>${items.map(item => `<li>${escapeHTML(item)}</li>`).join("")}</${tag}>
        </div>
      `;
    }

    return "";
  }

  function renderGuidanceSection(section) {
    const blocks = Array.isArray(section.blocks) ? section.blocks : [];
    const directHref = `#/guidance#${encodeURIComponent(section.id || "")}`;

    return `
      <article class="guidance-section" id="${escapeAttribute(section.id)}">
        <header class="guidance-section__head">
          <div class="guidance-section__identity">
            <span class="guidance-section__number">${escapeHTML(section.number || "")}</span>
            <div>
              ${section.eyebrow ? `<p class="guidance-section__eyebrow">${escapeHTML(section.eyebrow)}</p>` : ""}
              <h2>${escapeHTML(section.title || "")}</h2>
            </div>
          </div>
          <div class="guidance-section__meta">
            ${section.pages ? `<span>${escapeHTML(data.guidance?.config?.labels?.pages || "صفحات الدليل")}: ${escapeHTML(section.pages)}</span>` : ""}
            <a href="${escapeAttribute(directHref)}" class="guidance-section__link" aria-label="${escapeAttribute((data.guidance?.config?.labels?.directLink || "رابط مباشر") + ": " + (section.title || ""))}">
              <span>${escapeHTML(data.guidance?.config?.labels?.directLink || "رابط مباشر")}</span>
              <span aria-hidden="true">#</span>
            </a>
          </div>
          ${section.summary ? `<p class="guidance-section__summary">${escapeHTML(section.summary)}</p>` : ""}
        </header>
        <div class="guidance-section__body">
          ${blocks.map(guidanceBlockHTML).join("")}
        </div>
      </article>
    `;
  }

  function renderGuidance(query = "") {
    if (!guidanceGrid) return;

    const guidanceData = data.guidance || {};
    const config = guidanceData.config || {};
    const labels = config.labels || {};
    const page = config.page || {};
    const source = guidanceData.source || {};

    const guidanceKicker = document.getElementById("guidanceKicker");
    const guidanceTitle = document.getElementById("guidanceTitle");
    const guidanceDescription = document.getElementById("guidanceDescription");
    if (guidanceKicker && page.kicker) guidanceKicker.textContent = page.kicker;
    if (guidanceTitle && page.title) guidanceTitle.textContent = page.title;
    if (guidanceDescription && page.description) guidanceDescription.textContent = page.description;
    const allSections = Array.isArray(guidanceData.sections)
      ? guidanceData.sections
      : (Array.isArray(guidanceData) ? guidanceData : []);

    const needle = query.trim().toLowerCase();
    const sections = allSections.filter(section => {
      if (!needle) return true;
      return JSON.stringify(section).toLowerCase().includes(needle);
    });

    const sourceBanner = `
      <aside class="guidance-source">
        <div class="guidance-source__mark" aria-hidden="true">UB</div>
        <div class="guidance-source__copy">
          <span>${escapeHTML(labels.source || "المصدر الرسمي")}</span>
          <strong>${escapeHTML(source.title || "")}</strong>
          <small>${escapeHTML([source.organization, source.year].filter(Boolean).join(" · "))}</small>
          ${source.note ? `<p>${escapeHTML(source.note)}</p>` : ""}
        </div>
        ${source.file ? `<a href="${escapeAttribute(source.file)}" download class="guidance-source__download">تنزيل الدليل PDF</a>` : ""}
      </aside>
    `;

    if (!sections.length) {
      guidanceGrid.innerHTML = `
        ${sourceBanner}
        <div class="content-card empty-state guidance-empty">
          ${emptyState("⌕", labels.noResultsTitle || "لا توجد نتائج", labels.noResultsText || "غيّر عبارة البحث وحاول مرة أخرى.")}
        </div>
      `;
      return;
    }

    guidanceGrid.innerHTML = `
      ${sourceBanner}
      <div class="guidance-layout">
        <nav class="guidance-toc" aria-label="${escapeAttribute(labels.contents || "محتويات الدليل")}">
          <div class="guidance-toc__head">
            <span>${escapeHTML(labels.contents || "محتويات الدليل")}</span>
            <strong>${String(sections.length).padStart(2, "0")}</strong>
          </div>
          <div class="guidance-toc__list">
            ${sections.map(section => `
              <a href="#/guidance#${encodeURIComponent(section.id || "")}" class="guidance-toc__item">
                <span>${escapeHTML(section.number || "")}</span>
                <b>${escapeHTML(section.title || "")}</b>
              </a>
            `).join("")}
          </div>
        </nav>

        <div class="guidance-sections">
          ${needle ? `<div class="guidance-search-note">نتائج البحث: <strong>${sections.length}</strong> من ${allSections.length}</div>` : ""}
          ${sections.map(renderGuidanceSection).join("")}
        </div>
      </div>
    `;
  }

  function openDeveloper() {
    if (!developerOverlay) return;
    developerOverlay.hidden = false;
    developerOverlay.setAttribute("aria-hidden", "false");
    document.body.classList.add("developer-open");
  }

  function closeDeveloper() {
    if (!developerOverlay) return;
    developerOverlay.hidden = true;
    developerOverlay.setAttribute("aria-hidden", "true");
    document.body.classList.remove("developer-open");
  }

  menuButton?.addEventListener("click", toggleMobileMenu);
  degreeChip?.addEventListener("click", () => requestRoute("home"));
  changeDegreeButtons.forEach(button => button.addEventListener("click", () => requestRoute("home")));

  navLinks.forEach(link => {
    link.addEventListener("click", event => {
      const route = link.dataset.nav;
      if (!route) return;
      event.preventDefault();
      requestRoute(route);
    });
  });

  degreeCards.forEach(card => {
    card.addEventListener("click", () => selectDegree(card.dataset.degree));
  });

  degreeNextButton?.addEventListener("click", () => {
    if (!selectedDegree) {
      showDegreeRequired(pendingRoute || "procedures");
      return;
    }

    const destination = pendingRoute && restrictedRoutes.has(pendingRoute)
      ? pendingRoute
      : "procedures";

    pendingRoute = null;
    updateNextButton();
    requestRoute(destination);
  });

  chooseDegreeButton?.addEventListener("click", () => {
    hideDegreeRequired();
    setRoute("home");
    window.setTimeout(() => {
      document.querySelector(".degree-option")?.focus({ preventScroll: true });
    }, 60);
    updateNextButton();
  });

  closeChoiceDialog?.addEventListener("click", cancelDegreeRequired);
  choiceDialog?.addEventListener("click", event => {
    if (event.target === choiceDialog) cancelDegreeRequired();
  });

  procedurePhases?.addEventListener("click", event => {
    const tab = event.target.closest("[data-procedure-phase]");
    if (!tab) return;
    currentProcedurePhase = tab.dataset.procedurePhase;
    renderProcedures();
  });

  proceduresContent?.addEventListener("click", event => {
    const completionButton = event.target.closest("[data-complete-step]");
    if (completionButton) {
      const step = completionButton.closest(".procedure-step");
      openCompletionDialog(step);
      return;
    }

    const downloadAction = event.target.closest('[data-procedure-action="download"]');
    if (downloadAction) {
      handleProcedureDownload(downloadAction);
      return;
    }

    const gotoAction = event.target.closest('[data-procedure-action="goto"]');
    if (gotoAction) {
      const route = gotoAction.dataset.route;
      const section = gotoAction.dataset.section || "";
      if (route === "guidance" && section && guidanceSearch) guidanceSearch.value = "";
      if (route) requestRoute(route, { anchor: section });
      return;
    }

    const button = event.target.closest(".procedure-step__summary");
    if (!button) return;

    const step = button.closest(".procedure-step");
    const details = step?.querySelector(".procedure-step__details");
    if (!step || !details) return;

    const expanded = button.getAttribute("aria-expanded") === "true";
    button.setAttribute("aria-expanded", expanded ? "false" : "true");
    details.hidden = expanded;
    step.classList.toggle("is-open", !expanded);
  });

  confirmCompletionButton?.addEventListener("click", confirmProcedureCompletion);
  cancelCompletionButton?.addEventListener("click", closeCompletionDialog);
  completionDialog?.addEventListener("click", event => {
    if (event.target === completionDialog) closeCompletionDialog();
  });

  closeFileDialogButton?.addEventListener("click", closeFileDialog);
  fileDialog?.addEventListener("click", event => {
    if (event.target === fileDialog) closeFileDialog();
  });

  templatePhaseFilters?.addEventListener("click", event => {
    const button = event.target.closest("[data-template-phase]");
    if (!button) return;
    currentTemplatePhase = button.dataset.templatePhase || "all";
    renderTemplates();
  });

  templatesContent?.addEventListener("click", event => {
    const downloadButton = event.target.closest("[data-template-download]");
    if (downloadButton) {
      handleProcedureDownload(downloadButton);
      return;
    }

    const procedureButton = event.target.closest("[data-template-procedure]");
    if (procedureButton) {
      currentProcedurePhase = procedureButton.dataset.templatePhase || currentProcedurePhase;
      requestRoute("procedures", { anchor: procedureButton.dataset.templateStep || "" });
    }
  });

  templateSearch?.addEventListener("input", renderTemplates);
  guidanceSearch?.addEventListener("input", () => renderGuidance(guidanceSearch.value));

  footerDevButton?.addEventListener("click", openDeveloper);
  mobileDevButton?.addEventListener("click", () => { closeMobileMenu(); openDeveloper(); });
  developerCloseButtons.forEach(button => button.addEventListener("click", closeDeveloper));

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      closeMobileMenu();
      if (!developerOverlay?.hidden) closeDeveloper();
      if (choiceDialog?.open) cancelDegreeRequired();
      if (completionDialog?.open) closeCompletionDialog();
      if (fileDialog?.open) closeFileDialog();
    }
  });

  window.addEventListener("hashchange", renderRoute);

  updateDegreeUI();
  renderProcedureShell();
  renderGuidance();

  if (!location.hash) setRoute("home", { replace: true });
  else renderRoute();
})();
