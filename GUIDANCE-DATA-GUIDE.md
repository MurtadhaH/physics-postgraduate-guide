# Guidance Data Guide — V15

The University Guidance interface is rendered from:

```js
SITE_DATA.guidance
```

The interface must not contain university-guidance content hard-coded in `index.html` or `app.js`.

## Structure

```js
guidance: {
  config: {
    page: { ... },
    labels: { ... }
  },
  source: {
    title: "...",
    organization: "...",
    year: "...",
    file: "./assets/docs/...pdf",
    note: "..."
  },
  sections: [ ... ]
}
```

Each section has a stable `id`. These IDs are used for deep links from procedures, for example:

```text
#/guidance#thesisTemplateSection
#/guidance#formattingSection
#/guidance#preliminaryPagesSection
```

Do not rename a section ID after procedure actions have begun using it unless every reference is updated.

## Supported block types

The renderer currently supports:

- `paragraph`
- `note`
- `subsection`
- `specs`
- `bullets`
- `steps`
- `checklist`
- `numbered-list`
- `links`

Example:

```js
{
  id: "exampleSection",
  number: "11",
  title: "عنوان القسم",
  summary: "ملخص القسم",
  pages: "10–12",
  keywords: "كلمات البحث",
  blocks: [
    {
      type: "subsection",
      title: "عنوان فرعي",
      text: "النص",
      items: ["نقطة أولى", "نقطة ثانية"]
    }
  ]
}
```

## Source discipline

The V15 guidance content is organized from the University of Baghdad / College of Science methodology guide bundled at:

```text
assets/docs/university-thesis-methodology-guide.pdf
```

When adding official guidance from another source, identify the source explicitly rather than silently merging unsupported information into an existing section.
