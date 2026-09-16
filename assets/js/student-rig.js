/**
 * Physics Postgraduate Guide — Character Motion System
 * Designed & Developed by Murtadha Altufaily
 * Copyright © 2026 Murtadha Altufaily. All Rights Reserved.
 * Unauthorized copying, redistribution, modification, or republication is not permitted.
 */

"use strict";

/* =========================================================
   ADVANCED STUDENT MOTION SYSTEM — V9
   GSAP 3.15 + MotionPath + DrawSVG + CustomEase

   Design goals:
   - authored character acting, not generic UI tweens
   - gaze leads the gesture, torso follows, hand arrives last
   - curved hand trajectories with controlled overshoot
   - subtle idle life: breathing, blinking, micro-saccades, tassel lag
   - real responsive choreography via gsap.matchMedia()
   - phone/tablet uses a dedicated confirmation performance (no arm)
   - reduced-motion is respected at system level
========================================================= */

(() => {
  const gsap = window.gsap;
  if (!gsap) return;

  const MotionPathPlugin = window.MotionPathPlugin;
  const DrawSVGPlugin = window.DrawSVGPlugin;
  const CustomEase = window.CustomEase;

  const plugins = [MotionPathPlugin, DrawSVGPlugin, CustomEase].filter(Boolean);
  if (plugins.length) gsap.registerPlugin(...plugins);

  const svg = document.getElementById("graduateRig");
  const panel = document.getElementById("characterPanel");
  const halo = panel?.querySelector(".character-panel__halo");
  const ambientOrbits = document.getElementById("ambientOrbits");
  const characterBody = document.getElementById("characterBody");
  const characterShadow = document.getElementById("characterShadow");
  const selectionAura = document.getElementById("selectionAura");
  const auraRingOuter = document.getElementById("auraRingOuter");
  const auraRingInner = document.getElementById("auraRingInner");
  const auraParticles = [...document.querySelectorAll("#auraParticles circle")];
  const orbitVisibleA = document.getElementById("orbitVisibleA");
  const orbitVisibleB = document.getElementById("orbitVisibleB");
  const electronA = document.getElementById("electronA");
  const electronB = document.getElementById("electronB");

  const options = [...document.querySelectorAll(".degree-option")];
  const nextButton = document.getElementById("degreeNextButton");

  const upperArm = document.getElementById("upperArm");
  const upperArmShadow = document.getElementById("upperArmShadow");
  const foreArm = document.getElementById("foreArm");
  const foreArmShadow = document.getElementById("foreArmShadow");
  const elbowJoint = document.getElementById("elbowJoint");
  const handRig = document.getElementById("handRig");
  const handPalm = document.getElementById("handPalm");
  const pointFinger = document.getElementById("pointFinger");
  const pointThumb = document.getElementById("pointThumb");

  const headRig = document.getElementById("headRig");
  const pupilRig = document.getElementById("pupilRig");
  const capRig = document.getElementById("capRig");
  const tasselRig = document.getElementById("tasselRig");
  const browLeft = document.getElementById("browLeft");
  const browRight = document.getElementById("browRight");
  const smilePath = document.getElementById("smilePath");
  const blinkLids = [...document.querySelectorAll(".blink-lid")];

  const motionText = document.getElementById("motionNoteText");
  const mobileState = document.getElementById("mobileDegreeState");
  const mobileStateSeal = mobileState?.querySelector(".mobile-degree-state__seal");
  const mobileStateCheck = mobileState?.querySelector(".mobile-degree-state__check");
  const mobileStateTitle = document.getElementById("mobileStateTitle");
  const mobileSealRing = document.getElementById("mobileSealRing");
  const mobileSealCap = document.getElementById("mobileSealCap");
  const mobileSealBase = document.getElementById("mobileSealBase");
  const mobileCheckRing = document.getElementById("mobileCheckRing");
  const mobileCheckPath = document.getElementById("mobileCheckPath");

  if (!svg || !panel || !characterBody || !headRig || !pupilRig) return;

  const mm = gsap.matchMedia();
  const degreeNames = { master: "الماجستير", phd: "الدكتوراه" };
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  const reachEase = CustomEase ? gsap.parseEase(".16,1,.3,1") : "power4.out";
  const bodyEase = CustomEase ? gsap.parseEase(".2,.82,.23,1") : "power3.out";
  const settleEase = CustomEase ? gsap.parseEase(".18,.9,.32,1") : "power3.out";

  const shoulder = { x: 343, y: 360 };
  const upperLength = 84;
  const foreLength = 88;
  const minReach = Math.abs(upperLength - foreLength) + 6;
  const maxReach = upperLength + foreLength - 5;

  const saved = localStorage.getItem("physicsGuideDegree");
  const state = {
    selected: degreeNames[saved] ? saved : null,
    preview: null,
    interactionTimeline: null,
    armTween: null,
    blinkCall: null,
    saccadeCall: null,
    ambientTweens: [],
    tasselIdle: null,
    compact: false
  };

  const pose = { x: 458, y: 384, handBias: 0 };
  const clamp = gsap.utils.clamp;
  const duration = value => reduceMotion.matches ? 0 : value;

  function setAriaPressed() {
    options.forEach(option => option.setAttribute(
      "aria-pressed",
      option.dataset.degree === state.selected ? "true" : "false"
    ));
  }

  function setActiveCard(card) {
    options.forEach(option => option.classList.toggle("is-active", option === card));
  }

  function screenPointToSvg(clientX, clientY) {
    const ctm = svg.getScreenCTM();
    if (!ctm) return { x: shoulder.x + 120, y: shoulder.y };
    const p = svg.createSVGPoint();
    p.x = clientX;
    p.y = clientY;
    return p.matrixTransform(ctm.inverse());
  }

  function targetForCard(card) {
    const rect = card.getBoundingClientRect();
    const local = screenPointToSvg(rect.left + 10, rect.top + rect.height * 0.5);
    const dx = local.x - shoulder.x;
    const dy = local.y - shoulder.y;
    const d = Math.hypot(dx, dy) || 1;
    const reach = maxReach * 0.91;
    return {
      x: shoulder.x + (dx / d) * reach,
      y: shoulder.y + (dy / d) * reach
    };
  }

  function idleTarget() {
    return { x: 452, y: 402 };
  }

  function solveTwoBoneIK(target) {
    let dx = target.x - shoulder.x;
    let dy = target.y - shoulder.y;
    let distance = Math.hypot(dx, dy) || 1;
    const clampedDistance = clamp(minReach, maxReach, distance);
    dx *= clampedDistance / distance;
    dy *= clampedDistance / distance;
    distance = clampedDistance;

    const base = Math.atan2(dy, dx);
    const shoulderOffset = Math.acos(clamp(-1, 1,
      (upperLength ** 2 + distance ** 2 - foreLength ** 2) /
      (2 * upperLength * distance)
    ));

    const upperAngle = base + shoulderOffset;
    const elbow = {
      x: shoulder.x + Math.cos(upperAngle) * upperLength,
      y: shoulder.y + Math.sin(upperAngle) * upperLength
    };
    const wrist = { x: shoulder.x + dx, y: shoulder.y + dy };
    const handAngle = Math.atan2(wrist.y - elbow.y, wrist.x - elbow.x);
    return { elbow, wrist, handAngle };
  }

  const linePath = (a, b) => `M ${a.x.toFixed(2)} ${a.y.toFixed(2)} L ${b.x.toFixed(2)} ${b.y.toFixed(2)}`;

  function renderPose() {
    if (!upperArm || !foreArm || !handRig) return;
    const solved = solveTwoBoneIK(pose);
    const upperPath = linePath(shoulder, solved.elbow);
    const forePath = linePath(solved.elbow, solved.wrist);

    upperArm.setAttribute("d", upperPath);
    upperArmShadow?.setAttribute("d", upperPath);
    foreArm.setAttribute("d", forePath);
    foreArmShadow?.setAttribute("d", forePath);
    elbowJoint?.setAttribute("cx", solved.elbow.x.toFixed(2));
    elbowJoint?.setAttribute("cy", solved.elbow.y.toFixed(2));

    const deg = (solved.handAngle * 180) / Math.PI + pose.handBias;
    handRig.setAttribute(
      "transform",
      `translate(${solved.wrist.x.toFixed(2)} ${solved.wrist.y.toFixed(2)}) rotate(${deg.toFixed(2)})`
    );
  }

  function pauseTasselIdle() {
    state.tasselIdle?.pause();
  }

  function resumeTasselIdle(delay = .6) {
    if (!state.tasselIdle || reduceMotion.matches) return;
    gsap.delayedCall(delay, () => state.tasselIdle?.resume());
  }

  function eyeTarget(target, degree = null, intensity = 1) {
    const lookX = clamp(-1, 1, (target.x - shoulder.x) / 118);
    const lookY = clamp(-1, 1, (target.y - shoulder.y) / 140);
    const sign = degree === "master" ? -1 : degree === "phd" ? 1 : 0;

    return {
      pupilX: lookX * 3.5 * intensity,
      pupilY: lookY * 2.1 * intensity,
      headX: lookX * 1.8 * intensity,
      headY: lookY * .9 * intensity,
      headRotation: clamp(-2.15, 2.15, lookX * .8 + lookY * 1.15 + sign * .22)
    };
  }

  function animateGaze(target, degree = null, { fast = false } = {}) {
    const g = eyeTarget(target, degree);
    const sign = degree === "master" ? -1 : degree === "phd" ? 1 : 0;
    const tl = gsap.timeline({ defaults: { overwrite: "auto" } });

    tl.to(pupilRig, {
      x: g.pupilX,
      y: g.pupilY,
      duration: duration(fast ? .12 : .17),
      ease: "power3.out"
    }, 0)
    .to([browLeft, browRight], {
      y: -0.7,
      rotation: i => i === 0 ? -0.35 * sign : 0.35 * sign,
      duration: duration(.18),
      ease: "power2.out"
    }, .01)
    .to(headRig, {
      x: g.headX,
      y: g.headY,
      rotation: g.headRotation,
      transformOrigin: "50% 72%",
      duration: duration(fast ? .22 : .34),
      ease: bodyEase
    }, .05)
    .to(capRig, {
      rotation: sign * .35,
      duration: duration(.38),
      ease: settleEase
    }, .07);

    return tl;
  }

  function animateHandIntent(active) {
    if (!pointFinger || !pointThumb || !handPalm) return;
    gsap.to(pointFinger, {
      scaleX: active ? 1 : .78,
      scaleY: active ? 1 : .94,
      duration: duration(active ? .34 : .28),
      ease: active ? reachEase : "power2.out",
      overwrite: "auto"
    });
    gsap.to(pointThumb, {
      rotation: active ? -4 : 8,
      x: active ? 0 : -1,
      duration: duration(.32),
      ease: "power2.out",
      overwrite: "auto"
    });
    gsap.to(handPalm, {
      scaleX: active ? 1.02 : .98,
      scaleY: active ? .99 : 1.01,
      duration: duration(.32),
      ease: "power2.out",
      overwrite: "auto"
    });
  }

  function animateArm(target, degree = null, { immediate = false, idle = false } = {}) {
    state.armTween?.kill();
    const dx = target.x - pose.x;
    const dy = target.y - pose.y;
    const dist = Math.hypot(dx, dy) || 1;
    const nx = dx / dist;
    const ny = dy / dist;
    const px = -ny;
    const py = nx;
    const sign = degree === "master" ? -1 : degree === "phd" ? 1 : 0;

    if (immediate || reduceMotion.matches) {
      pose.x = target.x;
      pose.y = target.y;
      pose.handBias = sign * .9;
      renderPose();
      animateHandIntent(!idle);
      return;
    }

    const retract = { x: pose.x - nx * 8 + px * sign * 2, y: pose.y - ny * 5 + py * sign * 2 };
    const mid = {
      x: pose.x + dx * .52 + px * (degree ? sign * 10 : 4),
      y: pose.y + dy * .52 + py * (degree ? sign * 10 : 4)
    };
    const settle = { x: target.x + nx * 2.2, y: target.y + ny * 1.2 };

    animateHandIntent(!idle);

    if (MotionPathPlugin) {
      const tl = gsap.timeline();
      tl.to(pose, {
        x: retract.x,
        y: retract.y,
        duration: .08,
        ease: "power2.out",
        onUpdate: renderPose
      })
      .to(pose, {
        motionPath: {
          path: [
            { x: retract.x, y: retract.y },
            { x: mid.x, y: mid.y },
            { x: settle.x, y: settle.y },
            { x: target.x, y: target.y }
          ],
          resolution: 20
        },
        handBias: sign * .9,
        duration: .62,
        ease: reachEase,
        onUpdate: renderPose
      });
      state.armTween = tl;
    } else {
      state.armTween = gsap.to(pose, {
        x: target.x,
        y: target.y,
        handBias: sign * .9,
        duration: .58,
        ease: reachEase,
        onUpdate: renderPose
      });
    }
  }

  function gestureTo(degree, card, { immediate = false, idle = false } = {}) {
    state.interactionTimeline?.kill();
    pauseTasselIdle();

    const target = card ? targetForCard(card) : idleTarget();
    const sign = degree === "master" ? -1 : degree === "phd" ? 1 : 0;
    const gaze = animateGaze(target, degree, { fast: immediate });

    const tl = gsap.timeline({ onComplete: () => resumeTasselIdle(.35) });
    tl.add(gaze, 0)
      .to(characterBody, {
        x: degree ? 2.5 : 0,
        rotation: degree === "master" ? -.28 : degree === "phd" ? .28 : 0,
        transformOrigin: "260px 520px",
        duration: duration(immediate ? 0 : .42),
        ease: bodyEase,
        overwrite: "auto"
      }, .07)
      .to(tasselRig, {
        rotation: sign * 4.5,
        transformOrigin: "18% 4%",
        duration: duration(.18),
        ease: "power2.out",
        overwrite: "auto"
      }, .06)
      .to(tasselRig, {
        rotation: sign * -1.6,
        duration: duration(.32),
        ease: settleEase,
        overwrite: "auto"
      }, .23)
      .add(() => animateArm(target, degree, { immediate, idle }), immediate ? 0 : .13);

    if (!idle && degree) {
      // Keep the smile anchored to its original SVG geometry. A small horizontal
      // expression reads naturally without lifting the mouth on desktop.
      tl.to(smilePath, {
        scaleX: 1.035,
        scaleY: 1,
        duration: duration(.18),
        ease: "power2.out",
        overwrite: "auto"
      }, .12)
      .to(smilePath, {
        scaleX: 1,
        scaleY: 1,
        duration: duration(.26),
        ease: settleEase,
        overwrite: "auto"
      }, .30);
    } else {
      tl.to(smilePath, {
        scaleX: 1,
        scaleY: 1,
        duration: duration(.22),
        overwrite: "auto"
      }, 0);
    }

    state.interactionTimeline = tl;
  }

  function playAura(accent = "blue") {
    if (!selectionAura) return;
    const color = accent === "navy" ? "#294b6e" : "#1769d2";

    gsap.killTweensOf([selectionAura, auraRingOuter, auraRingInner, ...auraParticles]);
    gsap.set(selectionAura, { opacity: 1, scale: .94, transformOrigin: "50% 50%" });
    gsap.set(auraParticles, { opacity: 0, scale: .35, transformOrigin: "50% 50%" });
    gsap.set([auraRingOuter, auraRingInner], { stroke: color, opacity: .22 });

    const tl = gsap.timeline();
    if (DrawSVGPlugin) {
      gsap.set([auraRingOuter, auraRingInner], { drawSVG: "0%" });
      tl.to(auraRingOuter, { drawSVG: "100%", duration: duration(.56), ease: "power2.out" }, 0)
        .to(auraRingInner, { drawSVG: "100%", duration: duration(.46), ease: "power2.out" }, .08);
    }

    tl.to(selectionAura, { scale: 1.035, duration: duration(.58), ease: reachEase }, 0)
      .to(auraParticles, {
        opacity: .78,
        scale: 1,
        duration: duration(.22),
        stagger: { each: .045, from: "random" },
        ease: "back.out(1.8)"
      }, .16)
      .to(auraParticles, {
        opacity: 0,
        scale: .6,
        duration: duration(.42),
        stagger: .025,
        ease: "power2.in"
      }, .52)
      .to(selectionAura, { opacity: 0, scale: 1.08, duration: duration(.48), ease: "power2.out" }, .62);
  }

  function blinkOnce(doubleBlink = false) {
    if (reduceMotion.matches || !blinkLids.length) return;
    const tl = gsap.timeline();
    tl.set(blinkLids, { opacity: 0, scaleY: 1 })
      .to(blinkLids, { opacity: 1, scaleY: .96, duration: .045, ease: "power1.in" })
      .to(blinkLids, { opacity: 0, scaleY: 1, duration: .07, ease: "power1.out" });
    if (doubleBlink) {
      tl.to({}, { duration: .095 })
        .to(blinkLids, { opacity: 1, duration: .04 })
        .to(blinkLids, { opacity: 0, duration: .06 });
    }
  }

  function scheduleBlink() {
    state.blinkCall?.kill();
    if (reduceMotion.matches) return;
    state.blinkCall = gsap.delayedCall(gsap.utils.random(3.4, 7.3, .1), () => {
      blinkOnce(Math.random() < .14);
      scheduleBlink();
    });
  }

  function scheduleMicroSaccade() {
    state.saccadeCall?.kill();
    if (reduceMotion.matches) return;
    state.saccadeCall = gsap.delayedCall(gsap.utils.random(2.2, 5.2, .1), () => {
      if (!state.preview && !state.selected && !state.compact) {
        const dx = gsap.utils.random(-1.25, 1.25, .05);
        const dy = gsap.utils.random(-.65, .65, .05);
        gsap.to(pupilRig, { x: dx, y: dy, duration: .11, ease: "power2.out" });
        gsap.to(pupilRig, { x: 0, y: 0, duration: .24, ease: "power2.out", delay: .13 });
      }
      scheduleMicroSaccade();
    });
  }

  function startAmbientLife() {
    if (reduceMotion.matches) return;

    // Breathing is split across Y and scale so it reads as body weight, not floating.
    state.ambientTweens.push(
      gsap.to(characterBody, {
        y: -1.7,
        scaleY: 1.003,
        transformOrigin: "260px 548px",
        duration: 3.45,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      }),
      gsap.to(characterShadow, {
        scaleX: .965,
        opacity: .075,
        transformOrigin: "50% 50%",
        duration: 3.45,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      })
    );

    state.tasselIdle = gsap.to(tasselRig, {
      rotation: 1.35,
      transformOrigin: "18% 4%",
      duration: 2.4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    if (MotionPathPlugin && electronA && electronB) {
      const a = gsap.to(electronA, {
        duration: 8.8,
        repeat: -1,
        ease: "none",
        motionPath: { path: "#orbitMotionA", align: "#orbitMotionA", alignOrigin: [.5, .5] }
      });
      const b = gsap.to(electronB, {
        duration: 11.3,
        repeat: -1,
        ease: "none",
        motionPath: { path: "#orbitMotionB", align: "#orbitMotionB", alignOrigin: [.5, .5] }
      });
      b.progress(.48);
      state.ambientTweens.push(a, b);
    } else {
      state.ambientTweens.push(
        gsap.to(electronA, { x: 4, y: -2, duration: 3.6, repeat: -1, yoyo: true, ease: "sine.inOut" }),
        gsap.to(electronB, { x: -4, y: 2, duration: 4.1, repeat: -1, yoyo: true, ease: "sine.inOut" })
      );
    }

    scheduleBlink();
    scheduleMicroSaccade();
  }

  function playEntrance() {
    if (reduceMotion.matches) return;

    const tl = gsap.timeline({ defaults: { ease: reachEase } });
    gsap.set(selectionAura, { opacity: 0 });
    gsap.set(auraParticles, { opacity: 0 });
    gsap.set([pointFinger], { scaleX: .78, transformOrigin: "0% 50%" });
    gsap.set([mobileCheckRing, mobileCheckPath], { opacity: 1 });

    if (DrawSVGPlugin) {
      gsap.set([orbitVisibleA, orbitVisibleB], { drawSVG: "0%" });
      tl.to(orbitVisibleA, { drawSVG: "100%", duration: .95 }, 0)
        .to(orbitVisibleB, { drawSVG: "100%", duration: .95 }, .12);
    }

    tl.from(characterBody, {
      y: 9,
      scale: .985,
      opacity: 0,
      duration: .72,
      transformOrigin: "260px 548px"
    }, .06)
    .from(characterShadow, { scaleX: .78, opacity: 0, duration: .64, transformOrigin: "50% 50%" }, .10)
    .from([electronA, electronB], { scale: 0, opacity: 0, duration: .4, stagger: .12, ease: "back.out(1.8)" }, .45);
  }

  function updateCompactState(degree) {
    const valid = degreeNames[degree] ? degree : null;
    panel.dataset.mobileDegree = valid || "idle";
    if (mobileState) mobileState.dataset.degree = valid || "idle";
    if (mobileStateTitle) mobileStateTitle.textContent = valid ? degreeNames[valid] : "لم تُحدد بعد";
  }

  function drawMobileSeal() {
    if (!DrawSVGPlugin) return;
    gsap.set([mobileSealRing, mobileSealCap, mobileSealBase, mobileCheckRing, mobileCheckPath], { drawSVG: "0%" });
  }

  function animateMobileSelection(degree, card) {
    const sign = degree === "master" ? -1 : 1;
    const accent = degree === "master" ? "blue" : "navy";
    const icon = card?.querySelector(".degree-option__icon");
    const label = mobileState?.querySelector(".mobile-degree-state__copy");

    updateCompactState(degree);
    setActiveCard(card);
    playAura(accent);
    pauseTasselIdle();
    drawMobileSeal();

    state.interactionTimeline?.kill();
    const tl = gsap.timeline({ onComplete: () => resumeTasselIdle(.5) });

    // 1) Eye contact with the selected choice.
    tl.to(pupilRig, {
      x: sign * 2.3,
      y: .45,
      duration: duration(.12),
      ease: "power3.out"
    }, 0)
    .to(headRig, {
      x: sign * 1.4,
      y: -1.0,
      rotation: sign * .95,
      duration: duration(.24),
      ease: bodyEase
    }, .045)

    // 2) A compact physical acknowledgment: lift, nod, settle.
    .to(characterBody, {
      y: -4.2,
      scaleY: 1.005,
      duration: duration(.23),
      ease: "power2.out",
      overwrite: "auto"
    }, .08)
    .to(headRig, {
      y: 1.4,
      rotation: sign * .28,
      duration: duration(.16),
      ease: "power2.inOut"
    }, .24)
    .to(headRig, {
      x: 0,
      y: 0,
      rotation: 0,
      duration: duration(.34),
      ease: settleEase
    }, .40)
    .to(pupilRig, {
      x: 0,
      y: 0,
      duration: duration(.26),
      ease: "power2.out"
    }, .40)
    .to(characterBody, {
      y: 0,
      scaleY: 1,
      duration: duration(.36),
      ease: settleEase,
      overwrite: "auto"
    }, .31)

    // 3) Tassel lags behind the head, then catches up.
    .to(tasselRig, {
      rotation: sign * 8,
      duration: duration(.18),
      ease: "power2.out",
      overwrite: "auto"
    }, .10)
    .to(tasselRig, {
      rotation: sign * -3.2,
      duration: duration(.22),
      ease: "power2.inOut",
      overwrite: "auto"
    }, .28)
    .to(tasselRig, {
      rotation: 0,
      duration: duration(.34),
      ease: settleEase,
      overwrite: "auto"
    }, .50)

    // 4) The academic status behaves like a credential being issued.
    .fromTo(mobileState,
      { y: 7, scaleX: .965, scaleY: .985, opacity: .72 },
      { y: 0, scaleX: 1, scaleY: 1, opacity: 1, duration: duration(.36), ease: reachEase },
      .12
    )
    .fromTo(label,
      { y: 7, opacity: 0 },
      { y: 0, opacity: 1, duration: duration(.30), ease: "power3.out" },
      .19
    )
    .fromTo(mobileStateSeal,
      { scale: .82, rotation: sign * -8 },
      { scale: 1, rotation: 0, duration: duration(.42), ease: "back.out(1.45)" },
      .17
    );

    if (DrawSVGPlugin) {
      tl.to(mobileSealRing, { drawSVG: "100%", duration: duration(.38), ease: "power2.out" }, .18)
        .to([mobileSealCap, mobileSealBase], { drawSVG: "100%", duration: duration(.30), stagger: .05, ease: "power2.out" }, .30)
        .to(mobileCheckRing, { drawSVG: "100%", duration: duration(.25), ease: "power2.out" }, .37)
        .to(mobileCheckPath, { drawSVG: "100%", duration: duration(.22), ease: "power2.out" }, .52);
    } else {
      tl.fromTo(mobileStateCheck, { scale: .25, opacity: 0 }, { scale: 1, opacity: 1, duration: .32, ease: "back.out(1.7)" }, .40);
    }

    if (icon) {
      tl.fromTo(icon,
        { scale: .92, rotation: sign * -3 },
        { scale: 1.06, rotation: sign * 1.3, duration: duration(.22), ease: "power3.out" },
        .14
      )
      .to(icon, { scale: 1, rotation: 0, duration: duration(.30), ease: settleEase }, .36);
    }

    tl.to(smilePath, { scaleX: 1.05, scaleY: 1, duration: duration(.20), ease: "power2.out" }, .20)
      .to(smilePath, { scaleX: 1, scaleY: 1, duration: duration(.28), ease: settleEase }, .46);

    state.interactionTimeline = tl;
  }

  function confirmDesktopSelection(degree, card) {
    const sign = degree === "master" ? -1 : 1;
    const icon = card?.querySelector(".degree-option__icon");
    playAura(degree === "master" ? "blue" : "navy");
    pauseTasselIdle();

    const tl = gsap.timeline({ onComplete: () => resumeTasselIdle(.4) });
    tl.to(headRig, { y: 1.9, rotation: sign * .40, duration: duration(.13), ease: "power2.inOut" }, 0)
      .to(headRig, { y: 0, rotation: sign * .10, duration: duration(.26), ease: settleEase }, .13)
      .to(tasselRig, { rotation: sign * 5.5, duration: duration(.14), ease: "power2.out" }, 0)
      .to(tasselRig, { rotation: sign * -1.5, duration: duration(.26), ease: settleEase }, .16)
      .to(smilePath, { scaleX: 1.05, scaleY: 1, duration: duration(.17), ease: "power2.out" }, .04)
      .to(smilePath, { scaleX: 1, scaleY: 1, duration: duration(.26), ease: settleEase }, .21);

    if (icon) {
      tl.to(icon, { scale: 1.08, rotation: sign * 2.2, duration: duration(.18), ease: "power3.out" }, .03)
        .to(icon, { scale: 1, rotation: 0, duration: duration(.30), ease: settleEase }, .20);
    }
  }

  function setDesktopMode(degree, card = null, { immediate = false } = {}) {
    state.preview = card ? degree : null;
    setActiveCard(card);

    if (card) {
      if (motionText) motionText.textContent = degreeNames[degree] || "";
      gestureTo(degree, card, { immediate, idle: false });
    } else {
      if (motionText) motionText.textContent = "حرّك المؤشر فوق أحد الخيارين";
      gestureTo(null, null, { immediate, idle: true });
    }
  }

  function syncSelectedCard() {
    const selectedCard = state.selected ? options.find(o => o.dataset.degree === state.selected) : null;
    setAriaPressed();

    if (state.compact) {
      setActiveCard(selectedCard);
      updateCompactState(state.selected);
      if (DrawSVGPlugin && state.selected) {
        gsap.set([mobileSealRing, mobileSealCap, mobileSealBase, mobileCheckRing, mobileCheckPath], { drawSVG: "100%" });
      }
    } else {
      updateCompactState(null);
      setDesktopMode(state.selected || null, selectedCard, { immediate: true });
    }
  }

  function resetAmbientTransforms() {
    gsap.set([headRig, pupilRig, capRig, tasselRig], { clearProps: "x,y,rotation" });
    gsap.set([browLeft, browRight, smilePath], { clearProps: "x,y,rotation,scale" });
    gsap.set(characterBody, { x: 0, rotation: 0 });
  }

  function setupNextButtonObserver() {
    if (!nextButton) return;
    const reveal = () => {
      if (nextButton.hidden || reduceMotion.matches) return;
      gsap.fromTo(nextButton,
        { y: 8, scale: .985, opacity: 0 },
        { y: 0, scale: 1, opacity: 1, duration: .42, ease: reachEase, overwrite: "auto" }
      );
    };
    const observer = new MutationObserver(reveal);
    observer.observe(nextButton, { attributes: true, attributeFilter: ["hidden"] });
    if (!nextButton.hidden) reveal();
  }

  function setupPointerParallax() {
    if (reduceMotion.matches) return () => {};
    const haloX = halo ? gsap.quickTo(halo, "x", { duration: .65, ease: "power3.out" }) : null;
    const haloY = halo ? gsap.quickTo(halo, "y", { duration: .65, ease: "power3.out" }) : null;
    const orbitX = ambientOrbits ? gsap.quickTo(ambientOrbits, "x", { duration: .75, ease: "power3.out" }) : null;
    const orbitY = ambientOrbits ? gsap.quickTo(ambientOrbits, "y", { duration: .75, ease: "power3.out" }) : null;

    const move = event => {
      const r = panel.getBoundingClientRect();
      const nx = (event.clientX - r.left) / r.width - .5;
      const ny = (event.clientY - r.top) / r.height - .5;
      haloX?.(nx * 12); haloY?.(ny * 9);
      orbitX?.(nx * -5); orbitY?.(ny * -4);
    };
    const leave = () => {
      haloX?.(0); haloY?.(0); orbitX?.(0); orbitY?.(0);
    };
    panel.addEventListener("pointermove", move, { passive: true });
    panel.addEventListener("pointerleave", leave, { passive: true });
    return () => {
      panel.removeEventListener("pointermove", move);
      panel.removeEventListener("pointerleave", leave);
    };
  }

  options.forEach(card => {
    const degree = card.dataset.degree;

    card.addEventListener("pointerenter", event => {
      if (state.compact || event.pointerType === "touch") return;
      setDesktopMode(degree, card);
    });

    card.addEventListener("pointerleave", event => {
      if (state.compact || event.pointerType === "touch") return;
      const selectedCard = state.selected ? options.find(o => o.dataset.degree === state.selected) : null;
      setDesktopMode(state.selected || null, selectedCard);
    });

    card.addEventListener("focus", () => {
      if (state.compact) return;
      setDesktopMode(degree, card);
    });

    card.addEventListener("blur", () => {
      if (state.compact) return;
      const selectedCard = state.selected ? options.find(o => o.dataset.degree === state.selected) : null;
      setDesktopMode(state.selected || null, selectedCard);
    });

    card.addEventListener("click", () => {
      state.selected = degree;
      setAriaPressed();
      if (state.compact) animateMobileSelection(degree, card);
      else {
        setDesktopMode(degree, card);
        confirmDesktopSelection(degree, card);
      }
    });
  });

  mm.add({
    compact: "(max-width: 860px)",
    desktop: "(min-width: 861px)",
    reduceMotion: "(prefers-reduced-motion: reduce)"
  }, context => {
    const { compact, desktop, reduceMotion: reduced } = context.conditions;
    state.compact = compact;

    if (reduced) {
      state.blinkCall?.kill();
      state.saccadeCall?.kill();
      state.ambientTweens.forEach(t => t.kill());
      state.tasselIdle?.kill();
      resetAmbientTransforms();
      syncSelectedCard();
      return;
    }

    if (desktop) {
      const cleanupParallax = setupPointerParallax();
      syncSelectedCard();
      return cleanupParallax;
    }

    if (compact) {
      resetAmbientTransforms();
      syncSelectedCard();
    }
  });

  // A clean entrance gives the whole rig a designed first impression.
  gsap.set(characterBody, { transformOrigin: "260px 548px" });
  gsap.set(headRig, { transformOrigin: "50% 72%" });
  gsap.set(smilePath, { transformOrigin: "50% 50%", scaleX: 1, scaleY: 1 });
  gsap.set(capRig, { transformOrigin: "50% 78%" });
  gsap.set(tasselRig, { transformOrigin: "18% 4%" });
  gsap.set(blinkLids, { opacity: 0 });
  gsap.set(pointFinger, { scaleX: .78, transformOrigin: "0% 50%" });
  renderPose();
  playEntrance();
  startAmbientLife();
  setupNextButtonObserver();
  syncSelectedCard();

  if (typeof reduceMotion.addEventListener === "function") {
    reduceMotion.addEventListener("change", () => location.reload());
  }
})();
