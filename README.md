# دليل الدراسات العليا — قسم علوم الفيزياء

**Designed & Developed by Murtadha Altufaily**  
**Copyright © 2026 Murtadha Altufaily. All Rights Reserved.**

واجهة عربية متجاوبة لتنظيم إجراءات ونماذج وتعليمات طلبة الدراسات العليا في قسم علوم الفيزياء، كلية العلوم، جامعة بغداد.

## Current release

**V16 — GitHub Production Release**

The project includes:

- Degree-specific postgraduate paths for Master's and PhD students.
- Data-driven procedures generated from `assets/data/site-data.js`.
- Step completion tracking with confirmation and local browser persistence.
- Dynamic actions for downloads, internal guidance navigation and external links.
- A central document registry used by both Procedures and Templates.
- A searchable, data-driven University Guidance section.
- Responsive desktop, tablet and mobile interfaces.
- SVG/GSAP-based student animation.
- Visible developer attribution and copyright notices.

## Source of truth

```text
assets/data/site-data.js
```

Procedures, document metadata and University Guidance are rendered from this data source. Content should not be duplicated in `index.html` or `app.js`.

## Documents

```text
assets/documents/
├── master/
│   ├── before/
│   ├── defense/
│   └── after/
└── phd/
    ├── before/
    ├── defense/
    └── after/
```

Official files should retain their original filenames. After adding a file, update only its matching record in `assets/data/site-data.js`.

## University material

The project includes and summarizes University of Baghdad / College of Science guidance supplied for the website. University-issued documents, official forms, names and other institutional materials remain subject to the rights and rules of their respective issuing institutions.

## Copyright and reuse

This repository is **not distributed under an open-source license**. See [`COPYRIGHT.md`](./COPYRIGHT.md).

Public access to this repository or deployed website does not grant permission to copy, redistribute, modify, sell, sublicense or republish the original project.

## Deployment

No backend or build process is required. The project can be hosted directly with GitHub Pages. See [`GITHUB-DEPLOYMENT.md`](./GITHUB-DEPLOYMENT.md).

---

**Designed & Developed by Murtadha Altufaily**  
© 2026 Murtadha Altufaily. All Rights Reserved.
