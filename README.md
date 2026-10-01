# BlueCoree

Website for **Bluecoree** — IT infrastructure, cloud and web/app development, Kolkata.
Live at [bluecoree.com](https://bluecoree.com).

Built with React, Vite, Framer Motion and React Router. Enquiries are delivered by EmailJS.

## Develop

```bash
npm install
npm run dev      # http://localhost:5280
```

## Build & deploy

```bash
npm run build
```

Upload everything inside `dist/` (including the hidden `.htaccess`) to the web root.
The `.htaccess` handles HTTPS, SPA routing and 301 redirects from the old PHP URLs.

## Editing content

| What | Where |
| --- | --- |
| Services, stats, FAQs, testimonials, contact details | `src/data.js` |
| Service photos (900×600, named by slug) | `public/services/` |
| Colours & layout | `src/index.css` (tokens at the top) |
| Pages | `src/pages/` |
| Hero network animation | `src/components/HeroNetwork.jsx` |
