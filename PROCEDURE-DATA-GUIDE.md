# Procedure Data Guide — V13

The Procedures interface is generated from:

`assets/data/site-data.js`

Do **not** add procedure content to `index.html` or `app.js`.

## Degree and phase structure

```js
procedures: {
  master: {
    before: [],
    defense: [],
    after: []
  },
  phd: {
    before: [],
    defense: [],
    after: []
  }
}
```

Each procedure needs a stable `id` because the student's completion state is saved against it in browser `localStorage`.

## Register an official document

Documents are registered separately from procedure steps:

```js
documents: {
  master: {
    before: [
      {
        id: "scientific-integrity-form",
        title: "استمارة الرصانة العلمية",
        folder: "./assets/documents/master/before/",
        file: null
      }
    ]
  }
}
```

Keep `file: null` until the real document is uploaded. The download button will still appear. Clicking it shows:

`لم يتم رفع هذا الملف بعد.`

When the official file is available, preserve its original filename and change only:

```js
file: "Original-Official-Filename.docx"
```

Then place that file in the registered folder.

## Procedure step

```js
{
  id: "unique-step-id",
  title: "عنوان الخطوة",
  summary: "ملخص قصير",
  requirements: [
    "المتطلب الأول",
    "المتطلب الثاني"
  ],
  note: "ملاحظة اختيارية",
  actions: []
}
```

## Download action using the document registry

```js
{
  type: "download",
  documentId: "scientific-integrity-form",
  label: "تنزيل استمارة الرصانة العلمية",
  style: "primary"
}
```

## Go to a section inside the website

```js
{
  type: "goto",
  label: "تعليمات التنسيق والترتيب",
  route: "guidance",
  section: "formatting",
  style: "secondary"
}
```

This creates navigation such as:

`#/guidance#formatting`

## Normal link

```js
{
  type: "link",
  label: "فتح الرابط",
  url: "https://example.com",
  target: "_blank",
  style: "secondary"
}
```

## Completion state

A checkbox is generated automatically before every procedure step. The student must confirm before the step is marked complete. Completion is stored separately by degree, phase, and stable step ID under:

`physicsGuideProcedureProgressV1`


## Templates page

The Templates page is generated automatically from `SITE_DATA.documents`. Do not create a second template list.

- Add a document once under `documents.<degree>.<phase>`.
- Reference it from any procedure action using `documentId`.
- The Templates page discovers all linked procedure steps automatically.
- Keep `file: null` until the official file is uploaded; the button remains visible and shows `لم يتم رفع هذا الملف بعد.`
