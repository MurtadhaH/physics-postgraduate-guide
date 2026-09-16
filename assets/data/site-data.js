/**
 * Physics Postgraduate Guide — Site Data Architecture
 * Designed & Developed by Murtadha Altufaily
 * Copyright © 2026 Murtadha Altufaily. All Rights Reserved.
 * University-issued documents and official guidance remain the property of their respective issuers.
 * Unauthorized copying of this original data architecture or code is not permitted.
 */

"use strict";

/*
  ==========================================================
  SITE DATA — V15
  ==========================================================

  Procedures, Templates and University Guidance are rendered
  from this file. Keep content out of index.html/app.js.

  Guidance content below is organized from the University of
  Baghdad / College of Science methodology guide (2021).
*/

window.SITE_DATA = {
  "procedures": {
    "config": {
      "page": {
        "kicker": "المسار الدراسي",
        "title": "الإجراءات",
        "description": "انتقل بين مراحل المسار، وافتح أي خطوة لعرض متطلباتها وإجراءاتها المرتبطة."
      },
      "phases": [
        {
          "id": "before",
          "number": "01",
          "title": "قبل المناقشة",
          "shortDescription": "التحضير والمتطلبات السابقة",
          "description": "الإجراءات والمتطلبات التي تسبق المناقشة، مرتبة حسب التسلسل المعتمد."
        },
        {
          "id": "defense",
          "number": "02",
          "title": "المناقشة",
          "shortDescription": "إجراءات يوم المناقشة",
          "description": "التحضيرات والإجراءات التي ينفذها الطالب في يوم المناقشة."
        },
        {
          "id": "after",
          "number": "03",
          "title": "بعد المناقشة",
          "shortDescription": "التعديلات والتسليم النهائي",
          "description": "الإجراءات اللاحقة للمناقشة حتى إكمال معاملة منح الشهادة."
        }
      ],
      "labels": {
        "step": "الخطوة",
        "details": "التفاصيل",
        "requirements": "المطلوب",
        "note": "ملاحظة",
        "completed": "مكتمل",
        "markComplete": "تحديد الخطوة كمكتملة",
        "noProceduresTitle": "لم تُضف الإجراءات الرسمية بعد",
        "noProceduresText": "عند إضافة الإجراءات ستظهر كل خطوة بالترتيب، ومعها الأزرار والروابط المطلوبة مباشرة."
      }
    },
    "master": {
      "before": [
        {
          "id": "msc-before-01-thesis-template",
          "title": "تهيئة رسالة الماجستير وفق القالب الرسمي",
          "summary": "تأكد من أن الرسالة مرتبة ومهيأة وفق دليل جامعة بغداد قبل البدء بمعاملة المناقشة.",
          "kind": "required",
          "importance": "normal",
          "requirements": [
            "مراجعة الغلاف وصفحة العنوان والصفحات الأولية.",
            "مراجعة ترتيب الفصول والمصادر والملاحق.",
            "مراجعة التنسيق والهوامش والخطوط وترقيم الصفحات."
          ],
          "actions": [
            {
              "type": "download",
              "documentId": "msc-thesis-template",
              "style": "primary",
              "label": "تنزيل قالب رسالة الماجستير"
            },
            {
              "type": "goto",
              "label": "تعليمات قالب رسالة الماجستير",
              "route": "guidance",
              "section": "thesisTemplateSection",
              "style": "secondary"
            },
            {
              "type": "goto",
              "label": "تعليمات التنسيق والترتيب",
              "route": "guidance",
              "section": "formattingSection",
              "style": "secondary"
            },
            {
              "type": "goto",
              "label": "تعليمات الصفحات الأولى",
              "route": "guidance",
              "section": "preliminaryPagesSection",
              "style": "secondary"
            },
            {
              "type": "download",
              "label": "تنزيل دليل جامعة بغداد PDF",
              "url": "./assets/docs/university-thesis-methodology-guide.pdf",
              "style": "secondary",
              "filename": "university-thesis-methodology-guide.pdf"
            }
          ]
        },
        {
          "id": "msc-before-02-supervisor-review",
          "title": "مراجعة النسخة النهائية مع المشرف",
          "summary": "اعرض النسخة المرشحة للمناقشة على المشرف للتأكد من جاهزيتها علميًا وشكليًا.",
          "kind": "required",
          "importance": "normal",
          "actions": [
            {
              "type": "goto",
              "label": "تعليمات إقرار المشرف",
              "route": "guidance",
              "section": "preliminaryPagesSection",
              "style": "secondary"
            }
          ]
        },
        {
          "id": "msc-before-03-first-paper",
          "title": "استكمال متطلبات البحث الأول",
          "summary": "يجب أن يكون البحث الأول منشورًا في مجلة تابعة لجامعة بغداد حصراً، ويُحتسب له 10 درجات تضاف إلى درجة المناقشة النهائية.",
          "kind": "required",
          "importance": "important",
          "badges": [
            {
              "label": "تعليمات القسم",
              "tone": "blue"
            },
            {
              "label": "10 درجات",
              "tone": "green"
            }
          ]
        },
        {
          "id": "msc-before-04-second-paper",
          "title": "استكمال متطلبات البحث الثاني",
          "summary": "يكون البحث الثاني إما في مجلة عالمية مفهرسة ضمن Scopus أو منشورًا ضمن مؤتمر.",
          "kind": "required",
          "importance": "important",
          "requirements": [
            "النشر في مجلة عالمية مفهرسة ضمن Scopus: 10 درجات.",
            "النشر ضمن مؤتمر: 8 درجات.",
            "في حالة المؤتمر، يجب ألا تكون المجلة التي ينشر فيها البحث من المجلات المفترسة وأن تكون مطابقة لشروط القسم."
          ],
          "badges": [
            {
              "label": "تعليمات القسم",
              "tone": "blue"
            },
            {
              "label": "10 أو 8 درجات",
              "tone": "green"
            }
          ]
        },
        {
          "id": "msc-before-05-integrity-first",
          "title": "إعداد معاملة الرصانة للبحث الأول",
          "summary": "أعد معاملة رصانة مستقلة للبحث الأول مع جميع الاستمارات المطلوبة.",
          "kind": "required",
          "importance": "normal",
          "requirements": [
            "ملء استمارة طلب الرصانة العلمية.",
            "ملء استمارة الرصانة العلمية.",
            "توقيع التعهد بصحة المعلومات المقدمة للرصانة."
          ],
          "actions": [
            {
              "type": "download",
              "documentId": "integrity-request-form",
              "style": "primary",
              "label": "تنزيل استمارة طلب الرصانة العلمية"
            },
            {
              "type": "download",
              "documentId": "scientific-integrity-form",
              "style": "secondary",
              "label": "تنزيل استمارة الرصانة العلمية"
            },
            {
              "type": "download",
              "documentId": "integrity-information-pledge",
              "style": "secondary",
              "label": "تنزيل استمارة التعهد بصحة معلومات الرصانة"
            }
          ]
        },
        {
          "id": "msc-before-06-integrity-first-attachments",
          "title": "إرفاق مستندات رصانة البحث الأول",
          "summary": "أرفق المستندات المؤيدة لبيانات البحث والمجلة مع استمارة الرصانة.",
          "kind": "required",
          "importance": "normal",
          "requirements": [
            "معلومات المجلة المطلوبة في الاستمارة.",
            "نسخة أو رابط واجهة المجلة بحسب المطلوب.",
            "نسخة من قبول النشر الصادر من المجلة أو صورة واضحة من البريد الإلكتروني المتضمن قبول النشر."
          ]
        },
        {
          "id": "msc-before-07-integrity-first-department",
          "title": "تدقيق رصانة البحث الأول لدى المسؤول في القسم",
          "summary": "اعرض الاستمارة ومرفقاتها على التدريسي المسؤول عن مراجعة استمارات الرصانة في القسم.",
          "kind": "required",
          "importance": "normal"
        },
        {
          "id": "msc-before-08-integrity-first-deanship",
          "title": "تدقيق رصانة البحث الأول في الدراسات العليا بالعمادة",
          "summary": "بعد تدقيق القسم، تُراجع الاستمارة في شعبة الدراسات العليا في عمادة كلية العلوم وتُوقّع ثم تعاد إلى الطالب.",
          "kind": "required",
          "importance": "normal"
        },
        {
          "id": "msc-before-09-integrity-first-submit",
          "title": "الاحتفاظ بنسخة وتسليم أصل رصانة البحث الأول",
          "summary": "بعد المصادقة، احتفظ بنسخة من الاستمارة وسلّم النسخة الأصلية إلى القسم.",
          "kind": "required",
          "importance": "normal",
          "requirements": [
            "احتفظ بنسخة واضحة من الاستمارة المصادق عليها.",
            "سلّم النسخة الأصلية إلى القسم."
          ]
        },
        {
          "id": "msc-before-10-integrity-second",
          "title": "إعداد معاملة الرصانة للبحث الثاني",
          "summary": "نفّذ معاملة رصانة مستقلة للبحث الثاني بنفس الاستمارات المطلوبة.",
          "kind": "required",
          "importance": "normal",
          "requirements": [
            "ملء استمارة طلب الرصانة العلمية.",
            "ملء استمارة الرصانة العلمية.",
            "توقيع التعهد بصحة المعلومات المقدمة للرصانة."
          ],
          "actions": [
            {
              "type": "download",
              "documentId": "integrity-request-form",
              "style": "primary",
              "label": "تنزيل استمارة طلب الرصانة العلمية"
            },
            {
              "type": "download",
              "documentId": "scientific-integrity-form",
              "style": "secondary",
              "label": "تنزيل استمارة الرصانة العلمية"
            },
            {
              "type": "download",
              "documentId": "integrity-information-pledge",
              "style": "secondary",
              "label": "تنزيل استمارة التعهد بصحة معلومات الرصانة"
            }
          ]
        },
        {
          "id": "msc-before-11-integrity-second-submit",
          "title": "تدقيق رصانة البحث الثاني وتسليم الأصل للقسم",
          "summary": "تمر استمارة البحث الثاني بالتدقيق لدى المسؤول في القسم ثم الدراسات العليا في العمادة، وبعد المصادقة يحتفظ الطالب بنسخة ويسلّم الأصل إلى القسم.",
          "kind": "required",
          "importance": "normal"
        },
        {
          "id": "msc-before-12-plagiarism-file",
          "title": "تهيئة ملف الرسالة لغرض الاستلال",
          "summary": "جهّز نسخة الاستلال وفق تعليمات قسم الفيزياء النهائية.",
          "kind": "required",
          "importance": "important",
          "requirements": [
            "حذف المصادر من نسخة الاستلال.",
            "حذف Literature Review من نسخة الاستلال.",
            "حذف الإهداء.",
            "حذف المحتويات.",
            "إرفاق واجهة الفصل الأول.",
            "لا داعي لحذف اسم الطالب."
          ],
          "actions": [
            {
              "type": "download",
              "documentId": "plagiarism-form",
              "style": "primary",
              "label": "تنزيل استمارة الاستلال"
            }
          ],
          "badges": [
            {
              "label": "تعليمات القسم",
              "tone": "blue"
            }
          ]
        },
        {
          "id": "msc-before-13-plagiarism-contact",
          "title": "الحصول من القسم على معلومات جهة إرسال الاستلال",
          "summary": "راجع القسم لمعرفة الجهة أو التدريسي المسؤول حاليًا عن استلام ملف الاستلال.",
          "kind": "required",
          "importance": "normal",
          "note": "لا يُذكر اسم شخص محدد في الموقع لأن المسؤول قد يتغير.",
          "badges": [
            {
              "label": "راجع القسم",
              "tone": "amber"
            }
          ]
        },
        {
          "id": "msc-before-14-send-plagiarism",
          "title": "إرسال ملف الاستلال",
          "summary": "أرسل نسخة الاستلال المهيأة إلى الجهة التي يحددها القسم وفق التعليمات الحالية.",
          "kind": "required",
          "importance": "normal"
        },
        {
          "id": "msc-before-15-plagiarism-result",
          "title": "استلام نتيجة الاستلال واستكمال ما يلزم",
          "summary": "استلم نتيجة الاستلال وأكمل أي متطلبات أو تصحيحات لازمة قبل الانتقال إلى التقويم العلمي.",
          "kind": "required",
          "importance": "normal",
          "actions": [
            {
              "type": "download",
              "documentId": "plagiarism-form",
              "style": "secondary",
              "label": "تنزيل استمارة الاستلال"
            }
          ]
        },
        {
          "id": "msc-before-16-reviewers-start",
          "title": "بدء معاملة التقويم العلمي واللغوي",
          "summary": "ابدأ معاملة التقويم بعد استكمال الاستلال.",
          "kind": "required",
          "importance": "important",
          "requirements": [
            "مقومان علميان محليان.",
            "مقوم علمي واحد من خارج جامعة بغداد.",
            "مقوم لغوي واحد.",
            "المجموع: أربعة مقومين."
          ],
          "actions": [
            {
              "type": "download",
              "documentId": "reviewers-committee-nomination",
              "style": "primary",
              "label": "تنزيل نموذج ترشيح المقومين العلميين ولجنة المناقشة"
            }
          ],
          "badges": [
            {
              "label": "4 مقومين",
              "tone": "blue"
            }
          ]
        },
        {
          "id": "msc-before-17-reviewer-letters",
          "title": "استلام كتب التقويم ونسخ الرسالة من المقررية",
          "summary": "استلم من المقررية الكتاب الرسمي والنسخة المطلوبة من الرسالة لكل مقوم.",
          "kind": "required",
          "importance": "normal",
          "requirements": [
            "كتاب رسمي لكل مقوم.",
            "نسخة من الرسالة لكل مقوم."
          ]
        },
        {
          "id": "msc-before-18-deliver-reviewers",
          "title": "تسليم نسخة الرسالة والكتاب الرسمي لكل مقوم",
          "summary": "سلّم كل مقوم النسخة المخصصة له مع الكتاب الرسمي الصادر من المقررية.",
          "kind": "required",
          "importance": "normal"
        },
        {
          "id": "msc-before-19-wait-review",
          "title": "انتظار اكتمال التقويم العلمي واللغوي",
          "summary": "تابع اكتمال التقويمات الأربعة قبل استلام المعاملة.",
          "kind": "waiting",
          "importance": "normal",
          "badges": [
            {
              "label": "انتظار",
              "tone": "gray"
            }
          ]
        },
        {
          "id": "msc-before-20-collect-review",
          "title": "استلام الرسالة وكتب التقويم بعد إكمال المقومين",
          "summary": "بعد انتهاء التقويم، أعد استلام الرسالة والكتاب/الكتب الرسمية وملاحظات المقومين بحسب السياق المتبع.",
          "kind": "required",
          "importance": "normal"
        },
        {
          "id": "msc-before-21-return-review",
          "title": "تسليم الرسالة وكتب التقويم وملاحظات المقومين إلى المقررية",
          "summary": "أعد المعاملة إلى المقررية للاطلاع على نتائج التقويم والملاحظات.",
          "kind": "required",
          "importance": "normal"
        },
        {
          "id": "msc-before-22-registry-review",
          "title": "تدقيق المقررية لملاحظات التقويم",
          "summary": "تراجع المقررية ملاحظات المقومين والمعاملة قبل إعادة الرسالة للطالب.",
          "kind": "required",
          "importance": "normal"
        },
        {
          "id": "msc-before-23-receive-notes",
          "title": "استلام الرسالة من المقررية مع الملاحظات",
          "summary": "استلم الرسالة بعد اطلاع المقررية على التقويم، وراجع الملاحظات الواردة قبل المناقشة.",
          "kind": "required",
          "importance": "normal",
          "note": "ملاحظات المقومين والمقررية هدفها مساعدة الطالب في ضمان سلامة الرسالة علميًا ولغويًا قبل المناقشة، وليست بالضرورة إلزامًا حرفيًا بتنفيذ كل ملاحظة.",
          "badges": [
            {
              "label": "مراجعة علمية ولغوية",
              "tone": "blue"
            }
          ]
        },
        {
          "id": "msc-before-24-review-notes-supervisor",
          "title": "مراجعة ملاحظات التقويم مع المشرف",
          "summary": "ناقش ملاحظات المقومين والمقررية مع المشرف ونفّذ التعديلات التي يتم الاتفاق عليها قبل المناقشة.",
          "kind": "required",
          "importance": "normal"
        },
        {
          "id": "msc-before-25-nominate-committee",
          "title": "ترشيح لجنة المناقشة",
          "summary": "ابدأ معاملة ترشيح لجنة المناقشة بعد اكتمال التقويمات المطلوبة.",
          "kind": "required",
          "importance": "normal",
          "note": "يُستخدم هذا الاسم مؤقتًا إلى حين التأكد مما إذا كان ترشيح المقومين ولجنة المناقشة يتم بنموذج واحد أو بنموذجين منفصلين.",
          "actions": [
            {
              "type": "download",
              "documentId": "reviewers-committee-nomination",
              "style": "primary",
              "label": "تنزيل نموذج ترشيح المقومين العلميين ولجنة المناقشة"
            }
          ]
        },
        {
          "id": "msc-before-26-committee-approvals",
          "title": "استكمال الموافقات على لجنة المناقشة",
          "summary": "تابع التسلسل الإداري والعلمي المطلوب حتى اعتماد لجنة المناقشة.",
          "kind": "required",
          "importance": "normal"
        },
        {
          "id": "msc-before-27-defense-order",
          "title": "صدور أمر المناقشة وتحديد الموعد والقاعة",
          "summary": "بعد اكتمال الموافقات، تأكد من بيانات أمر المناقشة.",
          "kind": "required",
          "importance": "important",
          "requirements": [
            "تاريخ المناقشة.",
            "وقت المناقشة.",
            "القاعة.",
            "رئيس لجنة المناقشة.",
            "أعضاء لجنة المناقشة."
          ]
        },
        {
          "id": "msc-before-28-dean-copy",
          "title": "إيصال نسخة من أمر المناقشة إلى مكتب العميد",
          "summary": "سلّم نسخة من أمر المناقشة إلى مكتب العميد حتى يتم توليد كتب الشكر الخاصة بأعضاء لجنة المناقشة.",
          "kind": "local",
          "importance": "critical",
          "note": "هذه خطوة إلزامية حسب الإجراء المعمول به في الكلية؛ عدم إيصال أمر المناقشة يعني عدم توليد كتب الشكر للمناقشين.",
          "badges": [
            {
              "label": "إجراء محلي إلزامي",
              "tone": "amber"
            }
          ]
        },
        {
          "id": "msc-before-29-deliver-thesis-committee",
          "title": "تسليم نسخ الرسالة إلى أعضاء لجنة المناقشة",
          "summary": "تأكد من وصول النسخ المطلوبة إلى أعضاء لجنة المناقشة حسب تعليمات القسم.",
          "kind": "required",
          "importance": "normal"
        },
        {
          "id": "msc-before-30-presentation",
          "title": "تهيئة عرض المناقشة والنسخ الاحتياطية",
          "summary": "جهّز العرض النهائي وكل ما يلزم لتشغيله دون الاعتماد على جهاز واحد.",
          "kind": "required",
          "importance": "important",
          "requirements": [
            "ملف PowerPoint النهائي.",
            "نسخة PDF من العرض.",
            "نسخة احتياطية على USB.",
            "شاحن الحاسوب.",
            "المحولات اللازمة للعرض.",
            "أي فيديو أو ملفات مرتبطة بالعرض."
          ]
        },
        {
          "id": "msc-before-31-hall-prep",
          "title": "تهيئة القاعة وأسماء أعضاء اللجنة والباحث",
          "summary": "تأكد من تجهيز المتطلبات العملية الخاصة بالقاعة قبل يوم المناقشة.",
          "kind": "local",
          "importance": "normal",
          "requirements": [
            "أسماء رئيس وأعضاء لجنة المناقشة.",
            "اسم الباحث.",
            "الروب الأكاديمي.",
            "ترتيب ونظافة القاعة.",
            "جاهزية الحاسوب.",
            "جاهزية جهاز العرض."
          ],
          "badges": [
            {
              "label": "تحضير عملي",
              "tone": "gray"
            }
          ]
        }
      ],
      "defense": [
        {
          "id": "msc-defense-01-arrive-early",
          "title": "الحضور إلى القاعة قبل الموعد",
          "summary": "احضر قبل موعد المناقشة بوقت كافٍ لإكمال جميع الفحوصات والتحضيرات النهائية.",
          "kind": "required",
          "importance": "important"
        },
        {
          "id": "msc-defense-02-test-display",
          "title": "اختبار الحاسوب وجهاز العرض",
          "summary": "شغّل العرض كاملًا وتأكد من عمل كل العناصر قبل دخول اللجنة.",
          "kind": "required",
          "importance": "critical",
          "requirements": [
            "الخطوط تظهر بصورة صحيحة.",
            "الصور والرسومات واضحة.",
            "الفيديو يعمل إن وجد.",
            "المعادلات تظهر بصورة صحيحة.",
            "وضع العرض الكامل يعمل.",
            "النسخة الاحتياطية جاهزة."
          ]
        },
        {
          "id": "msc-defense-03-names",
          "title": "التأكد من أسماء اللجنة واسم الباحث",
          "summary": "تأكد من وضع أسماء رئيس وأعضاء اللجنة واسم الباحث بالشكل الصحيح.",
          "kind": "required",
          "importance": "normal"
        },
        {
          "id": "msc-defense-04-hall",
          "title": "التأكد من ترتيب ونظافة القاعة",
          "summary": "راجع ترتيب القاعة ونظافتها بما يناسب استقبال لجنة المناقشة والحضور.",
          "kind": "local",
          "importance": "normal",
          "badges": [
            {
              "label": "تحضير عملي",
              "tone": "gray"
            }
          ]
        },
        {
          "id": "msc-defense-05-backups",
          "title": "تجهيز النسخ الاحتياطية للعرض",
          "summary": "تأكد من وجود نسخة احتياطية يمكن تشغيلها فورًا عند حدوث أي مشكلة تقنية.",
          "kind": "required",
          "importance": "normal"
        },
        {
          "id": "msc-defense-06-gown",
          "title": "ارتداء الروب الأكاديمي",
          "summary": "ارتدِ الروب الأكاديمي في الوقت المطلوب قبل التقاط الصور الرسمية أو بدء المناقشة.",
          "kind": "required",
          "importance": "normal"
        },
        {
          "id": "msc-defense-07-student-photo",
          "title": "التقاط الصورة الرسمية للباحث",
          "summary": "التقط صورة بالروب مع ظهور اسم الباحث لاستخدامها لاحقًا عند طلب قسم الإعلام.",
          "kind": "local",
          "importance": "important",
          "badges": [
            {
              "label": "مهم",
              "tone": "amber"
            },
            {
              "label": "إجراء إعلامي محلي",
              "tone": "gray"
            }
          ]
        },
        {
          "id": "msc-defense-08-committee-photo",
          "title": "التقاط صورة مع لجنة المناقشة",
          "summary": "التقط صورة رسمية مع لجنة المناقشة بالروب لاستخدامها لاحقًا عند طلب قسم الإعلام.",
          "kind": "local",
          "importance": "important",
          "badges": [
            {
              "label": "مهم",
              "tone": "amber"
            },
            {
              "label": "إجراء إعلامي محلي",
              "tone": "gray"
            }
          ]
        },
        {
          "id": "msc-defense-09-thank-you",
          "title": "استلام أو متابعة كتب الشكر",
          "summary": "أرسل شخصًا إلى العمادة لاستلام كتب الشكر أو راجعها شخصيًا بعد انتهاء المناقشة بحسب الإجراء المتبع.",
          "kind": "local",
          "importance": "critical",
          "badges": [
            {
              "label": "عالية الأهمية",
              "tone": "red"
            },
            {
              "label": "إجراء محلي",
              "tone": "gray"
            }
          ]
        },
        {
          "id": "msc-defense-10-correction-period",
          "title": "تسجيل مدة إجراء التصحيحات",
          "summary": "سجّل المدة التي تحددها لجنة المناقشة أو رئيس اللجنة لتنفيذ التعديلات.",
          "kind": "required",
          "importance": "critical",
          "note": "لا تعتمد مدة شهر كمدة ثابتة؛ المدة المعتمدة هي التي تحددها لجنة المناقشة."
        },
        {
          "id": "msc-defense-11-assigned-member",
          "title": "معرفة عضو اللجنة المكلف بمتابعة التعديلات",
          "summary": "تأكد من اسم عضو لجنة المناقشة الذي سيقوم بمراجعة التصحيحات بعد تنفيذها.",
          "kind": "required",
          "importance": "important"
        },
        {
          "id": "msc-defense-12-collect-copies",
          "title": "جمع نسخ الرسالة التي تحتوي على ملاحظات اللجنة",
          "summary": "اجمع جميع النسخ التي دوّن عليها رئيس وأعضاء لجنة المناقشة ملاحظاتهم لاستخدامها كأساس لمرحلة التصحيح.",
          "kind": "required",
          "importance": "critical"
        }
      ],
      "after": [
        {
          "id": "msc-after-01-organize-notes",
          "title": "جمع ملاحظات اللجنة وتنظيمها",
          "summary": "حوّل جميع ملاحظات أعضاء اللجنة إلى قائمة واضحة قبل البدء بالتعديلات.",
          "kind": "required",
          "importance": "normal",
          "requirements": [
            "جمع الملاحظات من جميع النسخ.",
            "دمج الملاحظات المتكررة.",
            "تمييز الملاحظات التي تحتاج مراجعة مع المشرف."
          ]
        },
        {
          "id": "msc-after-02-apply-corrections",
          "title": "تنفيذ التعديلات ضمن المدة المحددة",
          "summary": "نفّذ التعديلات المطلوبة خلال المدة التي حددتها لجنة المناقشة.",
          "kind": "required",
          "importance": "critical"
        },
        {
          "id": "msc-after-03-supervisor-review",
          "title": "مراجعة التعديلات مع المشرف",
          "summary": "اعرض النسخة المعدلة على المشرف قبل استكمال المصادقات.",
          "kind": "required",
          "importance": "normal"
        },
        {
          "id": "msc-after-04-member-review",
          "title": "مراجعة التعديلات مع عضو اللجنة المكلف",
          "summary": "اعرض النسخة المعدلة على عضو لجنة المناقشة المكلف بمتابعة التصحيحات.",
          "kind": "required",
          "importance": "normal"
        },
        {
          "id": "msc-after-05-member-signature",
          "title": "استحصال توقيع عضو اللجنة المكلف",
          "summary": "بعد التأكد من تنفيذ التعديلات، استحصل على توقيع عضو اللجنة المكلف.",
          "kind": "required",
          "importance": "normal",
          "actions": [
            {
              "type": "download",
              "documentId": "committee-corrections-followup",
              "style": "primary",
              "label": "تنزيل استمارة عضو لجنة المناقشة المكلف بمتابعة التعديلات"
            }
          ]
        },
        {
          "id": "msc-after-06-supervisor-approval",
          "title": "استحصال موافقة المشرف على التعديلات",
          "summary": "استحصل على موافقة المشرف على النسخة المعدلة.",
          "kind": "required",
          "importance": "normal",
          "actions": [
            {
              "type": "download",
              "documentId": "supervisor-corrections-approval",
              "style": "primary",
              "label": "تنزيل استمارة موافقة المشرف على التعديلات"
            }
          ]
        },
        {
          "id": "msc-after-07-student-pledge",
          "title": "توقيع تعهد الطالب بإجراء التعديلات",
          "summary": "وقّع التعهد الخاص بتنفيذ تعديلات لجنة المناقشة.",
          "kind": "required",
          "importance": "normal",
          "actions": [
            {
              "type": "download",
              "documentId": "student-corrections-pledge",
              "style": "primary",
              "label": "تنزيل استمارة تعهد الطالب بإجراء التعديلات"
            }
          ]
        },
        {
          "id": "msc-after-08-final-version",
          "title": "تهيئة النسخة النهائية من الرسالة",
          "summary": "بعد اعتماد التصحيحات، جهّز النسخة النهائية وفق القالب الرسمي.",
          "kind": "required",
          "importance": "normal",
          "actions": [
            {
              "type": "download",
              "documentId": "msc-thesis-template",
              "style": "primary",
              "label": "تنزيل قالب رسالة الماجستير"
            },
            {
              "type": "goto",
              "label": "تعليمات النسخة النهائية",
              "route": "guidance",
              "section": "thesisTemplateSection",
              "style": "secondary"
            },
            {
              "type": "goto",
              "label": "تعليمات التنسيق والترتيب",
              "route": "guidance",
              "section": "formattingSection",
              "style": "secondary"
            },
            {
              "type": "goto",
              "label": "تعليمات الهيكل العام",
              "route": "guidance",
              "section": "thesisStructureSection",
              "style": "secondary"
            }
          ]
        },
        {
          "id": "msc-after-09-committee-page-signatures",
          "title": "استكمال تواقيع صفحة لجنة المناقشة",
          "summary": "تُستكمل التواقيع والأختام النهائية لصفحة قرار لجنة المناقشة بعد تنفيذ التصحيحات المطلوبة.",
          "kind": "required",
          "importance": "important",
          "note": "دليل جامعة بغداد ينص على استكمال هذه التواقيع في المراحل النهائية بعد إكمال التصحيحات والتغييرات المطلوبة.",
          "actions": [
            {
              "type": "goto",
              "label": "تعليمات صفحة قرار لجنة المناقشة",
              "route": "guidance",
              "section": "preliminaryPagesSection",
              "style": "secondary"
            }
          ]
        },
        {
          "id": "msc-after-10-submit-post-defense-forms",
          "title": "تسليم استمارات ما بعد المناقشة إلى المقررية",
          "summary": "سلّم الاستمارات والوثائق المطلوبة إلى المقررية لإكمال التدقيق.",
          "kind": "required",
          "importance": "normal",
          "requirements": [
            "تعهد الطالب بإجراء التعديلات.",
            "استمارة عضو لجنة المناقشة المكلف بمتابعة التعديلات.",
            "استمارة موافقة المشرف على التعديلات.",
            "الوثائق الإضافية التي تطلبها المقررية."
          ],
          "actions": [
            {
              "type": "download",
              "documentId": "student-corrections-pledge",
              "style": "secondary",
              "label": "تنزيل استمارة تعهد الطالب بإجراء التعديلات"
            },
            {
              "type": "download",
              "documentId": "committee-corrections-followup",
              "style": "secondary",
              "label": "تنزيل استمارة عضو لجنة المناقشة المكلف بمتابعة التعديلات"
            },
            {
              "type": "download",
              "documentId": "supervisor-corrections-approval",
              "style": "secondary",
              "label": "تنزيل استمارة موافقة المشرف على التعديلات"
            }
          ]
        },
        {
          "id": "msc-after-11-registry-audit",
          "title": "تدقيق معاملة ما بعد المناقشة",
          "summary": "تقوم المقررية/الدراسات العليا بتدقيق المعاملة والنسخة النهائية قبل رفعها.",
          "kind": "required",
          "importance": "normal"
        },
        {
          "id": "msc-after-12-post-defense-minutes",
          "title": "إعداد محضر ما بعد المناقشة",
          "summary": "تُستكمل معاملة نتيجة المناقشة والتعديلات لغرض عرضها على مجلس الكلية.",
          "kind": "required",
          "importance": "normal",
          "note": "يُراجع الاسم والإجراء النهائي من المقررية عند تدقيق الموقع."
        },
        {
          "id": "msc-after-13-college-council",
          "title": "انتظار مصادقة مجلس الكلية",
          "summary": "تنتظر المعاملة عرضها على مجلس الكلية والمصادقة عليها.",
          "kind": "waiting",
          "importance": "normal",
          "badges": [
            {
              "label": "قيد المصادقة",
              "tone": "gray"
            }
          ]
        },
        {
          "id": "msc-after-14-final-approvals",
          "title": "استكمال المصادقات النهائية",
          "summary": "تُستكمل التواقيع والمصادقات النهائية وفق التسلسل الإداري للكلية.",
          "kind": "required",
          "importance": "normal"
        },
        {
          "id": "msc-after-15-final-pdf",
          "title": "تسليم نسخة PDF النهائية من الرسالة",
          "summary": "سلّم ملف PDF النهائي للرسالة بعد المناقشة وفق تعليمات المقررية.",
          "kind": "required",
          "importance": "normal",
          "note": "هذا المتطلب سيخضع للتدقيق من المقررية عند مراجعة الموقع.",
          "badges": [
            {
              "label": "قابل للتدقيق",
              "tone": "amber"
            }
          ]
        },
        {
          "id": "msc-after-16-final-cd",
          "title": "تسليم قرص CD يحتوي على الرسالة النهائية",
          "summary": "سلّم قرص CD يحتوي على الرسالة بصيغتها النهائية بعد المناقشة.",
          "kind": "required",
          "importance": "normal",
          "note": "هذا المتطلب سيخضع للتدقيق من المقررية عند مراجعة الموقع.",
          "badges": [
            {
              "label": "قابل للتدقيق",
              "tone": "amber"
            }
          ]
        },
        {
          "id": "msc-after-17-university-transfer",
          "title": "رفع المعاملة إلى الجهات الجامعية المختصة",
          "summary": "بعد استكمال إجراءات الكلية، تُرفع المعاملة لاستكمال إجراءات منح الشهادة.",
          "kind": "waiting",
          "importance": "normal",
          "badges": [
            {
              "label": "إجراء إداري",
              "tone": "gray"
            }
          ]
        },
        {
          "id": "msc-after-18-degree-order",
          "title": "صدور الأمر الجامعي بمنح شهادة الماجستير",
          "summary": "تمثل هذه الخطوة نهاية المسار الإداري بعد استكمال جميع المصادقات المطلوبة.",
          "kind": "waiting",
          "importance": "critical",
          "badges": [
            {
              "label": "المرحلة النهائية",
              "tone": "green"
            }
          ]
        }
      ]
    },
    "phd": {
      "before": [],
      "defense": [],
      "after": []
    }
  },
  "documents": {
    "master": {
      "before": [
        {
          "id": "msc-thesis-template",
          "title": "قالب رسالة الماجستير",
          "type": "template",
          "folder": "./assets/documents/master/before/",
          "file": null,
          "description": "القالب المعتمد لتهيئة رسالة الماجستير قبل المناقشة."
        },
        {
          "id": "integrity-request-form",
          "title": "استمارة طلب الرصانة العلمية",
          "type": "form",
          "folder": "./assets/documents/master/before/",
          "file": null,
          "description": "استمارة طلب الرصانة التي يوقعها الطالب لكل بحث."
        },
        {
          "id": "scientific-integrity-form",
          "title": "استمارة الرصانة العلمية",
          "type": "form",
          "folder": "./assets/documents/master/before/",
          "file": null,
          "description": "تُملأ بصورة مستقلة لكل بحث مقدم لنيل الرصانة."
        },
        {
          "id": "integrity-information-pledge",
          "title": "استمارة التعهد بصحة معلومات الرصانة",
          "type": "form",
          "folder": "./assets/documents/master/before/",
          "file": null,
          "description": "تعهد الطالب بصحة المعلومات المقدمة ضمن معاملة الرصانة."
        },
        {
          "id": "plagiarism-form",
          "title": "استمارة الاستلال",
          "type": "form",
          "folder": "./assets/documents/master/before/",
          "file": null,
          "description": "الاستمارة المستخدمة ضمن معاملة الاستلال."
        },
        {
          "id": "reviewers-committee-nomination",
          "title": "نموذج ترشيح المقومين العلميين ولجنة المناقشة",
          "type": "form",
          "folder": "./assets/documents/master/before/",
          "file": null,
          "description": "اسم مؤقت إلى حين التأكد مما إذا كان الترشيح يتم بنموذج واحد أو نموذجين منفصلين."
        }
      ],
      "defense": [],
      "after": [
        {
          "id": "committee-corrections-followup",
          "title": "استمارة عضو لجنة المناقشة المكلف بمتابعة التعديلات",
          "type": "form",
          "folder": "./assets/documents/master/after/",
          "file": null,
          "description": "توقّع بعد التحقق من تنفيذ تعديلات لجنة المناقشة."
        },
        {
          "id": "supervisor-corrections-approval",
          "title": "استمارة موافقة المشرف على التعديلات",
          "type": "form",
          "folder": "./assets/documents/master/after/",
          "file": null,
          "description": "موافقة المشرف على النسخة المعدلة بعد المناقشة."
        },
        {
          "id": "student-corrections-pledge",
          "title": "استمارة تعهد الطالب بإجراء التعديلات",
          "type": "form",
          "folder": "./assets/documents/master/after/",
          "file": null,
          "description": "تعهد الطالب بتنفيذ التعديلات المطلوبة بعد المناقشة."
        }
      ]
    },
    "phd": {
      "before": [],
      "defense": [],
      "after": []
    }
  },
  "templates": {
    "config": {
      "page": {
        "kicker": "الملفات الرسمية",
        "title": "النماذج",
        "description": "كل النماذج والملفات المرتبطة بإجراءات مرحلتك في مكان واحد."
      },
      "labels": {
        "all": "الكل",
        "total": "إجمالي النماذج",
        "available": "ملفات متوفرة",
        "pending": "بانتظار الرفع",
        "download": "تنزيل النموذج",
        "notUploaded": "لم يتم رفع هذا الملف بعد.",
        "usedIn": "يُستخدم في",
        "showProcedure": "عرض الإجراء",
        "availableStatus": "متوفر",
        "pendingStatus": "لم يُرفع بعد",
        "noDocumentsTitle": "لم تُضف نماذج لهذه المرحلة بعد",
        "noDocumentsText": "ستظهر النماذج هنا تلقائيًا عند إضافتها إلى سجل الملفات في ملف البيانات.",
        "noResultsTitle": "لا توجد نتائج",
        "noResultsText": "غيّر عبارة البحث أو اختر مرحلة أخرى."
      },
      "typeLabels": {
        "template": "قالب",
        "form": "استمارة",
        "document": "ملف"
      }
    }
  },
  "guidance": {
    "config": {
      "page": {
        "kicker": "جامعة بغداد · كلية العلوم",
        "title": "دليل كتابة الرسالة والأطروحة",
        "description": "تعليمات مرتبة من دليل منهجية رسائل الماجستير وأطاريح الدكتوراه للدراسات العلمية، مع روابط مباشرة لكل موضوع."
      },
      "labels": {
        "contents": "محتويات الدليل",
        "source": "المصدر الرسمي",
        "pages": "صفحات الدليل",
        "directLink": "رابط مباشر",
        "noResultsTitle": "لا توجد نتائج",
        "noResultsText": "غيّر عبارة البحث وحاول مرة أخرى.",
        "searchHint": "يمكنك البحث عن الهوامش، المستخلص، الفصول، المصادر أو أي تعليمات أخرى."
      }
    },
    "source": {
      "title": "دليل منهجية رسائل الماجستير وأطاريح الدكتوراه للدراسات العلمية",
      "organization": "جامعة بغداد · كلية العلوم",
      "year": "2021",
      "file": "./assets/docs/university-thesis-methodology-guide.pdf",
      "note": "المحتوى أدناه منظم من الدليل الرسمي لتسهيل الوصول إليه، ولا يستبدل النسخة الأصلية من الدليل."
    },
    "sections": [
      {
        "id": "thesisTemplateSection",
        "number": "01",
        "title": "تعليمات قالب الرسالة أو الأطروحة",
        "eyebrow": "ابدأ من هنا",
        "summary": "ملخص عملي يجمع أهم ما يجب أن يتضمنه قالب الرسالة أو الأطروحة قبل الدخول في التفاصيل.",
        "pages": "5–17",
        "keywords": "قالب الرسالة قالب الاطروحة template thesis dissertation الغلاف الصفحات الاولى الفصول التنسيق",
        "blocks": [
          {
            "type": "note",
            "tone": "info",
            "title": "ما الذي يغطيه القالب؟",
            "text": "يجب أن يحافظ القالب على الهيكل العام والترتيب والتنسيق والصفحات الأولية كما وردت في دليل جامعة بغداد. هذا الملخص يساعدك على المراجعة، بينما تبقى تفاصيل كل جزء في الأقسام التالية."
          },
          {
            "type": "checklist",
            "title": "الحد الأدنى الذي يجب أن تتأكد منه",
            "items": [
              "صفحة الغلاف الخارجي وصفحة بيضاء بعد الغلاف الأمامي وأخرى قبل الغلاف الخلفي.",
              "صفحة العنوان، وإقرار المشرف، وصفحة قرار لجنة المناقشة ومصادقة العميد.",
              "الإهداء إن وجد، والشكر والامتنان، والمستخلص، وفهارس المحتويات والأشكال والجداول والمختصرات.",
              "فصول الرسالة أو الأطروحة بالترتيب المحدد في الدليل.",
              "قائمة المصادر ثم الملاحق، ثم المستخلص وصفحة العنوان باللغة الأخرى.",
              "تطبيق متطلبات الورق والهوامش والخطوط والمسافات والترقيم وصفحات الفصل."
            ]
          },
          {
            "type": "links",
            "title": "انتقل إلى التفاصيل",
            "items": [
              {
                "label": "الهيكل العام للرسالة أو الأطروحة",
                "section": "thesisStructureSection"
              },
              {
                "label": "التنسيق والترتيب",
                "section": "formattingSection"
              },
              {
                "label": "الصفحات الأولى",
                "section": "preliminaryPagesSection"
              },
              {
                "label": "كتابة الفصول",
                "section": "chaptersSection"
              }
            ]
          }
        ]
      },
      {
        "id": "researchSelectionSection",
        "number": "02",
        "title": "مرحلة اختيار البحث",
        "eyebrow": "إرشادات عامة",
        "summary": "كيف يختار الطالب مشروع البحث ويضع خطته ويتابع العمل مع المشرف والقسم.",
        "pages": "3",
        "keywords": "اختيار البحث مشروع البحث المشرف خطة البحث حلقة نقاشية تقارير شهرية لقاءات اسبوعية",
        "blocks": [
          {
            "type": "steps",
            "items": [
              "يعد القسم أو الفرع العلمي قائمة بالتخصصات العامة ومشاريع البحوث في كل تخصص دون إعطاء العنوان كاملاً، ويثبت اسم المشرف أمام كل مشروع.",
              "في بداية الفصل الدراسي الثاني يختار الطالب ثلاثة مشاريع بحثية من القائمة حسب أولوية الرغبة وبالاستمارة المعدة لهذا الغرض. ويمكنه اقتراح مشروع بحث مع تقديم المبررات التي يقتنع بها القسم أو الفرع.",
              "بتوجيه من المشرف يراجع الطالب البحوث والدراسات ذات العلاقة والتخصص، مع التركيز على الأسس النظرية المتعلقة بموضوعه.",
              "يعقد الطالب والمشرف لقاءات أسبوعية، ويقدم الطالب تقارير دورية شهرية حول البحث.",
              "يصمم الطالب البحث ويضع خطته بتوجيه من المشرف.",
              "تناقش اللجنة العلمية في القسم خطة البحث بحضور الطالب والمشرف بعد إلقاء حلقة نقاشية عن الموضوع.",
              "يلتزم الطالب بإجراء التعديلات والإضافات المقدمة خلال مدة أقصاها شهر واحد من تاريخ إقرار موضوع البحث إن وجدت.",
              "يضع الطالب خطة لجمع البيانات اللازمة حسب طبيعة البحث، ويحدد المواقع والأدوات والوسائل المستخدمة وبرنامجاً زمنياً لإنجاز البحث.",
              "تُحلل البيانات والمعلومات وتُصمم الجداول والرسوم بتوجيه من المشرف."
            ]
          }
        ]
      },
      {
        "id": "methodologySection",
        "number": "03",
        "title": "منهجية البحث وخطة البحث",
        "eyebrow": "Research Methodology",
        "summary": "العناصر التي يركز عليها الدليل عند إعداد خطة البحث: العنوان، الأهمية، المشكلة، الدراسات السابقة، الفروض، المواد وطرائق العمل والمفاهيم.",
        "pages": "3–5",
        "keywords": "منهجية البحث العنوان اهمية البحث مشكلة البحث الدراسات السابقة فروض البحث المواد طرائق العمل المفاهيم",
        "blocks": [
          {
            "type": "subsection",
            "title": "العنوان",
            "text": "ينبغي أن يكون عنوان مشروع البحث متكاملاً ومتناسقاً مع الإطار والمجال المعرفي الذي ينتمي إليه، وأن يسمح باختيار منهج مناسب يحدد إجراءات البحث وأدواته."
          },
          {
            "type": "subsection",
            "title": "أهمية موضوع البحث",
            "text": "يبيّن الباحث أهمية الموضوع وضرورته بصورة تقنع القارئ، ويغطي العناصر التي حددها الدليل.",
            "items": [
              "فكرة البحث بصورة مفهومة ومقنعة وقابلة للمناقشة.",
              "تأريخ البحث وتحديد المدة الزمنية لإجرائه.",
              "علاقة البحث بالمجال المعرفي الذي ينتمي إليه.",
              "تحديد ملخص للمشكلة.",
              "الإشارة إلى ما إذا كانت المشكلة قد درست سابقاً.",
              "تحديد إسهامات البحث والجهات التي يمكن أن تستفيد من نتائجه."
            ]
          },
          {
            "type": "subsection",
            "title": "مشكلة البحث",
            "text": "يمثل تحديد المشكلة أحد المفاصل الأساسية للبحث، ويلتزم الباحث بتوضيح أبعادها."
          },
          {
            "type": "subsection",
            "title": "الدراسات السابقة",
            "text": "تساعد مراجعة الدراسات السابقة على توجيه الباحث والتعرف على إجراءات البحث وتقنياته، ويستهدف منها مشكلة البحث وفرضياته ومنهجه وأدواته ونتائج الدراسات السابقة، ثم يعرض رأيه وتقييمه."
          },
          {
            "type": "subsection",
            "title": "فروض البحث",
            "text": "يعرض الدليل الفروض بوصفها تفسيراً لمشكلة البحث وتقديم حلول علمية مقترحة لمعالجتها."
          },
          {
            "type": "subsection",
            "title": "المواد وطرائق العمل",
            "text": "تتضمن التقنيات البحثية والإجراءات والأدوات التي يحتاج إليها الباحث، ويؤكد الدليل أهمية اختيار المنهج المناسب لإنجاز البحث بدقة وعلمية."
          },
          {
            "type": "subsection",
            "title": "المفاهيم والمصادر",
            "text": "تتضمن خطة البحث المفاهيم الأساسية التي يتعامل معها البحث، ولا سيما الواردة في العنوان والمشكلة، وكذلك الفرضيات بما يقلل الغموض النظري."
          }
        ]
      },
      {
        "id": "thesisStructureSection",
        "number": "04",
        "title": "الهيكل العام للرسالة أو الأطروحة",
        "eyebrow": "General Structure",
        "summary": "الترتيب الرسمي لعناصر الرسالة أو الأطروحة من الغلاف إلى صفحة العنوان باللغة الأخرى.",
        "pages": "5–6",
        "keywords": "الهيكل العام الغلاف صفحة العنوان اقرار المشرف لجنة المناقشة المحتويات الفصول المصادر الملاحق",
        "blocks": [
          {
            "type": "numbered-list",
            "items": [
              "صفحة الغلاف الخارجي — Hard Cover Page.",
              "صفحة بيضاء فارغة بعد الغلاف الأمامي وأخرى بعد الغلاف الخلفي.",
              "صفحة العنوان — Title Page.",
              "آية قرآنية — اختيارية.",
              "صفحة إقرار المشرف أو المشرفين.",
              "إقرار ومصادقة لجنة المناقشة وعميد الكلية.",
              "الإهداء — اختياري.",
              "الشكر والامتنان.",
              "المستخلص.",
              "قائمة المحتويات.",
              "قائمة الأشكال.",
              "قائمة الجداول.",
              "قائمة المختصرات.",
              "فصول الرسالة أو الأطروحة: المقدمة، استعراض المراجع، منهجية البحث، النتائج والمناقشة، الاستنتاجات والتوصيات.",
              "المصادر.",
              "الملاحق.",
              "المستخلص باللغة الأخرى.",
              "صفحة العنوان باللغة الأخرى."
            ]
          }
        ]
      },
      {
        "id": "formattingSection",
        "number": "05",
        "title": "التنسيق والترتيب",
        "eyebrow": "Formatting",
        "summary": "متطلبات الورق والهوامش والخطوط والمسافات والترقيم والعناوين والفواصل بين الفصول.",
        "pages": "6–7",
        "keywords": "التنسيق A4 الهوامش الخطوط Arial Times New Roman ترقيم الصفحات صفحات فصلية headers spacing",
        "blocks": [
          {
            "type": "specs",
            "items": [
              {
                "label": "الورق",
                "value": "أبيض بحجم A4."
              },
              {
                "label": "الطباعة",
                "value": "نسخة واضحة، بخط متناسق، وباللون الأسود، والكتابة على وجه واحد."
              },
              {
                "label": "هامش التجليد",
                "value": "4 سم."
              },
              {
                "label": "الحواف الأخرى",
                "value": "2 سم، وبضمنها حافة النصوص المقتبسة والهوامش."
              },
              {
                "label": "إطار الصفحة",
                "value": "لا يستخدم أي إطار أو شكل للحواف حول الورقة الطباعية."
              },
              {
                "label": "تباعد الأسطر",
                "value": "1.5 بين أسطر المتن، وفراغ واحد في الهوامش أسفل الصفحة."
              },
              {
                "label": "المتن",
                "value": "حجم 14."
              },
              {
                "label": "العناوين",
                "value": "حجم 16 غامق."
              },
              {
                "label": "عناوين الفصول",
                "value": "حجم 18 غامق، وعنوان الفصل ورقمه في صفحة مستقلة بحجم 36."
              },
              {
                "label": "الخط العربي",
                "value": "Arial."
              },
              {
                "label": "الخط الإنكليزي",
                "value": "Times New Roman."
              },
              {
                "label": "عنوان الرسالة/الأطروحة",
                "value": "حجم 24 غامق."
              },
              {
                "label": "بداية المقطع الجديد",
                "value": "إزاحة 2 سم: إلى اليسار في العربية وإلى اليمين في الإنكليزية حسب نص الدليل."
              }
            ]
          },
          {
            "type": "note",
            "tone": "info",
            "title": "عدد الصفحات في الاختصاصات العلمية",
            "text": "يشير الدليل إلى ألا يزيد بحث الدبلوم العالي على 75 صفحة، ورسالة الماجستير على 150 صفحة، وأطروحة الدكتوراه على 200 صفحة، ويترك ما زاد عن ذلك للمشرف والقسم المختص مع التوصية بأن تكون الرسالة أو الأطروحة مركزة قدر الإمكان."
          },
          {
            "type": "bullets",
            "title": "قواعد إضافية",
            "items": [
              "عدم ترك مساحات فارغة في الورقة قدر الإمكان.",
              "يكون ترقيم الصفحات بالأرقام العربية 1، 2، 3 ابتداءً من المقدمة إلى نهاية المصادر.",
              "يكون رقم الصفحة في الزاوية العلوية اليمنى إذا كانت الرسالة بالإنكليزية، وفي الزاوية العلوية اليسرى إذا كانت بالعربية.",
              "لا ترقم صفحات العناوين العربية والإنكليزية، والآية، والإهداء، وإقرار المشرف، وإقرار لجنة المناقشة.",
              "ترقم صفحات الخلاصة الإنكليزية وفهارس المحتويات والأشكال والجداول والمختصرات بالأرقام اللاتينية I, II, III, IV … بحسب الدليل.",
              "ترقم صفحات الخلاصة العربية بالأحرف العربية كما ورد في الدليل.",
              "عند أول ظهور للمختصر يكتب المصطلح كاملاً ثم المختصر بين قوسين، وبعد ذلك يستخدم المختصر وحده.",
              "تضاف حاشية علوية (Header) تتضمن رقم الصفحة وعنوان الفصل.",
              "تستخدم صفحات فاصلة بين الفصول يكتب فيها عنوان الفصل ورقمه بحجم 36.",
              "يسمح بترقيم العناوين حتى أربعة مستويات، مثل 2.1 و2.1.1 و2.1.1.1."
            ]
          }
        ]
      },
      {
        "id": "preliminaryPagesSection",
        "number": "06",
        "title": "الصفحات الأولى",
        "eyebrow": "Preliminary Pages",
        "summary": "تفاصيل الغلاف وصفحة العنوان وإقرار المشرف ولجنة المناقشة والإهداء والشكر والمستخلص والفهارس.",
        "pages": "7–17",
        "keywords": "الصفحات الاولى الغلاف الماروني صفحة العنوان اقرار المشرف لجنة المناقشة العميد الاهداء الشكر المستخلص المحتويات",
        "blocks": [
          {
            "type": "subsection",
            "title": "صفحة الغلاف الخارجي",
            "text": "يكون الغلاف الخارجي من النوع السميك (Hard Cover) ولونه أحمر ماروني للاختصاصات العلمية. يحمل عنوان الرسالة أو الأطروحة والدرجة العلمية واسم الطالب والعام، ويحتوي الجزء الجانبي على بيانات الرسالة بحسب المثال الوارد في الدليل."
          },
          {
            "type": "subsection",
            "title": "صفحة العنوان",
            "text": "تتضمن شعار الجامعة والمعلومات التعريفية بالرسالة أو الأطروحة، وعنوانها، والصيغة الخاصة بتقديمها إلى مجلس الكلية كجزء من متطلبات الدرجة، ثم اسم الطالب كما هو مسجل رسمياً، واسم المشرف أو المشرفين مع اللقب العلمي، والسنة.",
            "items": [
              "يذكر الدليل شعاراً بحجم 3.5 × 3.5 سم في النموذج.",
              "عنوان الرسالة أو الأطروحة بحجم 24 غامق.",
              "اسم الطالب واسم المشرف أو المشرفين بحجم 18 غامق في النموذج.",
              "تكتب صفحة مماثلة باللغة الأخرى في الجانب الآخر من الرسالة أو الأطروحة."
            ]
          },
          {
            "type": "subsection",
            "title": "الآية القرآنية",
            "text": "صفحة اختيارية، وتكتب الآية وفق الرسم القرآني."
          },
          {
            "type": "subsection",
            "title": "إقرار المشرف",
            "text": "تتضمن الصفحة إقرار المشرف أو المشرفين بأن إعداد الرسالة أو الأطروحة تم تحت إشرافهم. يصادق عليها المشرف ورئيس القسم/رئيس لجنة الدراسات العليا، وتكون التواقيع والأختام أصلية وغير مستنسخة."
          },
          {
            "type": "subsection",
            "title": "قرار لجنة المناقشة ومصادقة عميد الكلية",
            "text": "تضم الصفحة تقرير وتواقيع أعضاء لجنة المناقشة مع مراتبهم العلمية ومصادقة عميد الكلية.",
            "items": [
              "تكون التواقيع والأختام أصلية وغير مستنسخة.",
              "تستكمل التواقيع في المراحل النهائية بعد إكمال التصحيحات والتغييرات المطلوبة حسب توصيات لجنة المناقشة وتعليمات الدراسات العليا."
            ]
          },
          {
            "type": "subsection",
            "title": "الإهداء",
            "text": "صفحة اختيارية، ويترك للطالب حرية الصياغة بما لا يتعارض مع القوانين والتعليمات النافذة."
          },
          {
            "type": "subsection",
            "title": "الشكر والامتنان",
            "text": "يترك للطالب حرية الصياغة مع الالتزام بالضوابط الأخلاقية والأكاديمية والقوانين والأعراف، ويقتصر الشكر والتقدير على من أسهموا فعلياً في الإشراف والدعم والمساعدة."
          },
          {
            "type": "subsection",
            "title": "المستخلص",
            "text": "يقدم المستخلص بياناً قصيراً وواضحاً يعكس هيكل الرسالة أو الأطروحة بأكملها، ويكتب في فقرة واحدة من دون عناوين فرعية.",
            "items": [
              "الغرض من البحث: المشكلة والأهداف الرئيسة ومجال أو نطاق البحث.",
              "المنهجية: المواد وطرائق العمل أو أساليب البحث وجمع البيانات والقياس والتحليل.",
              "النتائج الرئيسة، مع إعطاء أولوية للنتائج الجديدة.",
              "الاستنتاجات والتوصيات الرئيسة وأهمية النتائج.",
              "ألا يتجاوز 350 كلمة إلا في حالات تقررها لجنة المناقشة.",
              "وجود تطابق تام بين الخلاصتين العربية والإنكليزية."
            ]
          },
          {
            "type": "subsection",
            "title": "الفهارس",
            "text": "تشمل الصفحات الأولى قائمة المحتويات وقائمة الأشكال وقائمة الجداول وقائمة المختصرات، وتعرض كل قائمة العناصر ذات الصلة مع أرقام صفحاتها بحسب الدليل."
          }
        ]
      },
      {
        "id": "chaptersSection",
        "number": "07",
        "title": "كتابة فصول الرسالة أو الأطروحة",
        "eyebrow": "Chapters",
        "summary": "التوجيهات التفصيلية للمقدمة واستعراض المراجع والمنهجية والنتائج والمناقشة والاستنتاجات والتوصيات.",
        "pages": "17–21",
        "keywords": "المقدمة literature review المنهجية النتائج المناقشة الاستنتاجات التوصيات اسئلة البحث الاهداف",
        "blocks": [
          {
            "type": "subsection",
            "title": "الفصل الأول: المقدمة",
            "text": "يذكر الدليل أن المقدمة يجب أن تكون قابلة للقراءة بوضوح وألا يتجاوز طولها تقريباً 5–7% من إجمالي الرسالة أو الأطروحة.",
            "items": [
              "نظرة عامة: تلخيص ما هو معلوم وتحديد ما هو مجهول في موضوع البحث من دون تفاصيل.",
              "خلفية البحث: عرض خلفية موضوعية تبين الحاجة إلى الدراسة والفجوة أو المشكلة ذات الصلة.",
              "بيان المشكلة: عادة جملة أو جملتان تشرحان المشكلة التي سيعالجها البحث.",
              "أسئلة البحث: أكثر تحديداً من الأهداف، قابلة للإجابة، ويذكر الدليل 3 أسئلة على الأقل ولا تزيد على 6.",
              "أهداف البحث: يذكر الدليل 3–6 أهداف، مع مراعاة الملاءمة والتمييز والوضوح وقابلية التحقيق.",
              "مبررات البحث وأهميته.",
              "مجال البحث: الغرض العام والعينة ومدة الدراسة والموقع الجغرافي والموضوعات أو النظريات ذات الصلة.",
              "مخطط الرسالة أو الأطروحة: خارطة تبين ما يحتويه كل فصل أو قسم وترتيبه."
            ]
          },
          {
            "type": "subsection",
            "title": "الفصل الثاني: استعراض المراجع",
            "text": "توفر مراجعة الأدبيات والبحوث السابقة دعماً لأسئلة البحث وفرضياته وأهدافه، وتبريراً لأساليب وطرائق العمل، وخلفية معرفية ودعماً علمياً لأهمية البحث."
          },
          {
            "type": "subsection",
            "title": "الفصل الثالث: منهجية البحث",
            "text": "يتناول التفاصيل الدقيقة للمواد والأجهزة والطرائق والتقنيات المستخدمة بحيث يمكن الرجوع إليها والاستفادة منها في دراسات مشابهة.",
            "items": [
              "ذكر المواد والأجهزة والأدوات المستخدمة.",
              "ذكر الشركة المصنعة أو المنتجة واسم الدولة عند الحاجة.",
              "شرح طريقة التحضير بالتفصيل إذا تطلبت المواد تحضيراً مسبقاً.",
              "الإشارة إلى اسم مكتشف الطريقة وسنة الاكتشاف إذا كان ذلك مطلوباً.",
              "وصف جميع التجارب وكيفية إجرائها لجمع النتائج.",
              "عند التحليل الإحصائي: وصف الطريقة والبرنامج ومصدره وذكر النموذج الإحصائي المستخدم والفئات أو الوحدات التجريبية."
            ]
          },
          {
            "type": "subsection",
            "title": "الفصل الرابع: النتائج والمناقشة",
            "text": "تعرض النتائج بوضوح باستخدام الجداول والصور والرسوم والأشكال، ثم تناقش النتائج تفسيرياً بالرجوع إلى المعرفة والمراجع السابقة.",
            "items": [
              "عرض النتائج بصورة مجردة وواضحة، مع الفروق الإحصائية والمقارنات عند وجودها.",
              "مناقشة كل نتيجة أو مجموعة نتائج مترابطة بسرد علمي متسلسل.",
              "إيجاد تفسير علمي مدعوم بالمراجع، وإذا لم يوجد تفسير في المصادر يمكن للباحث استنباط تفسير مبني على فهم عميق للموضوع مع بيان الاتفاق أو الاختلاف مع الدراسات السابقة."
            ]
          },
          {
            "type": "subsection",
            "title": "الفصل الخامس: الاستنتاجات والتوصيات",
            "text": "الاستنتاجات بيان موجز لأهم المكتشفات المرتبطة بالأهداف والفرضيات والمساهمة في مجال المعرفة، مع بيان أهمية ما تم التوصل إليه.",
            "items": [
              "يمكن تناول مدى تحقق أهداف البحث، والقيود والمحددات، والصعوبات وطريقة حلها، ومسارات البحث المستقبلي.",
              "ينبغي أن تتضمن الفقرة ثلاثة عناصر على الأقل: ملخص المكتشفات والاستنتاجات، التوصيات، والمساهمات في مجال المعرفة.",
              "الاستنتاجات ليست باباً للمناقشة؛ فلا تدرج نقطة لم تناقش سابقاً.",
              "لا تدرج مراجع أو معلومات غير ضرورية أو توصيات لا ترتبط بوضوح باستنتاجات البحث."
            ]
          }
        ]
      },
      {
        "id": "figuresTablesSection",
        "number": "08",
        "title": "الصور والجداول والأشكال",
        "eyebrow": "Results Presentation",
        "summary": "ضوابط عرض الصور والجداول والمخططات والأشكال كما وردت ضمن تعليمات فصل النتائج والمناقشة.",
        "pages": "19–20",
        "keywords": "الصور الجداول الاشكال المخططات captions 12 غامق ترقيم الصور الجداول",
        "blocks": [
          {
            "type": "checklist",
            "items": [
              "توحيد حجم الصور والأشكال بحيث تظهر التفاصيل المطلوبة بوضوح.",
              "أن تكون التعليقات مختصرة وواضحة.",
              "يكون حجم خط التعليق 12 غامق.",
              "يوضع تعليق الصورة أو المخطط أو الشكل في الأسفل، بينما يكون عنوان الجدول في الأعلى.",
              "لا تظهر صورة لأي شخص، بما في ذلك الباحث أو أي من فريق البحث، ويكون التركيز على المادة العلمية.",
              "يمكن استخدام التأشيرات مثل الأسهم أو الأشكال المساعدة لإظهار المتغيرات بصورة واضحة ودقيقة.",
              "ترقم الصور والجداول والأشكال بالتسلسل وبصورة مستقلة لكل فصل، ويكون ترقيم الجداول مستقلاً عن ترقيم الصور."
            ]
          }
        ]
      },
      {
        "id": "referencesSection",
        "number": "09",
        "title": "كتابة المصادر",
        "eyebrow": "References Style",
        "summary": "قواعد قائمة المصادر والأسلوب المرجعي المحدد في الدليل.",
        "pages": "21",
        "keywords": "المصادر المراجع Harvard style referencing references",
        "blocks": [
          {
            "type": "bullets",
            "items": [
              "تحتوي الرسالة أو الأطروحة على قائمة بجميع المصادر المستخدمة التي تمت الإشارة إليها في المتن.",
              "توضع قائمة المصادر في نهاية الرسالة أو الأطروحة.",
              "لا يعد هذا الجزء فصلاً كبقية فصول الدراسة ولا يأخذ رقم فصل.",
              "ينص الدليل على استخدام Harvard style of referencing في المتن وفي قائمة المصادر."
            ]
          }
        ]
      },
      {
        "id": "appendicesSection",
        "number": "10",
        "title": "الملاحق",
        "eyebrow": "Appendices",
        "summary": "الملاحق جزء إضافي يوفر معلومات تكميلية وتوضع بعد قائمة المصادر.",
        "pages": "21",
        "keywords": "الملاحق appendices قائمة المصادر معلومات تكميلية",
        "blocks": [
          {
            "type": "paragraph",
            "text": "الملاحق جزء إضافي يمكن استخدامه لتوفير معلومات تكميلية للرسالة أو الأطروحة، ويظهر بعد قائمة المصادر."
          },
          {
            "type": "note",
            "tone": "info",
            "title": "بحث الدبلوم العالي",
            "text": "ينص الدليل على أن بحث الدبلوم العالي يخضع للمواصفات نفسها الواردة للرسالة أو الأطروحة في هذا الدليل."
          }
        ]
      }
    ]
  }
};
