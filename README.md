# Values Card Sort

A browser-based tool for the values card sort exercise. Drag cards into importance categories, then narrow down to identify your top personal values.

## How it works

**Phase 1 — Sort**

Drag value cards from the unsorted pile into three columns: Not Important, Important, and Very Important. Every card must be placed before you can proceed.

**Phase 2 — Narrow down**

From the cards you marked as Very Important, drag to rank and select your top 5 values. These are your core values.

**Phase 3 — Reflect**

Review your top values with a brief description of each. Optionally export or print the results.

## Running locally

```bash
npm install
npm run dev
```

Open `http://localhost:5173` in a browser.

## Building

```bash
npm run build    # outputs to dist/
npm run preview  # preview the production build locally
```

## Deploying

The build output is a static site — serve the `dist/` folder from any static host (Netlify, Vercel, GitHub Pages, etc.) or via Docker:

```bash
docker compose up --build
```

The container serves on port 3000.

## Device requirements

Designed for laptops and tablets (768px+). Cards require enough horizontal space to display labels clearly — narrower viewports are not supported.

## The values

The card deck covers 50+ values across domains including relationships, work, character, achievement, and wellbeing. Each card shows the value name and a one-line description to aid reflection.

## License

MIT © 2026 James Hobson
