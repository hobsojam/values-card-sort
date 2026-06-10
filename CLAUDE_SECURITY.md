# Security Guidelines for Claude

These rules apply whenever you are working in this repository. Follow them without exception unless the user explicitly overrides a specific rule with a clear reason.

## No persistence

This app is intentionally stateless. Do not introduce any form of persistence:

- No `localStorage`, `sessionStorage`, `IndexedDB`, or cookie writes
- No sending data to any external API or analytics service
- No logging user input to the console in production builds

If a future requirement calls for persistence, stop and confirm with the user before implementing it — it changes the app's privacy posture.

## Rendering user-controlled content

The value card data (`src/data/values.js`) is a static file baked into the build. Treat it as trusted. If user input is ever rendered (e.g., a name field, custom value text), follow these rules:

- **Never use `dangerouslySetInnerHTML`** with any string derived from user input
- **Never use `eval` or `new Function`** on any user-supplied string
- React's JSX escapes string content by default — do not work around this

## No external requests

This app has no backend and should make no network requests at runtime:

- Do not add `fetch`, `XMLHttpRequest`, or third-party SDK calls
- Do not load external scripts, fonts, or stylesheets from CDNs in `index.html` — bundle everything via npm instead

## Dependencies

- Do not add new npm packages without a clear reason tied to an existing feature requirement
- Do not pin to versions with known CVEs — run `npm audit` before adding a new package
- Keep the dependency count low; this is a simple UI tool

## Docker

- Do not copy `.env` files, secrets, or credential files into the Docker image
- The `.dockerignore` must exclude `node_modules`, `.git`, and local config files (already configured)

## Git

- **Never force-push to `master`**
- **Never commit secrets, tokens, or credentials** of any kind
- The `.gitignore` must exclude `.env` and `*.local` files (already configured)
- Do not amend published commits on shared branches without user confirmation

## What to do if uncertain

If an action could be destructive or irreversible, **stop and ask the user for confirmation** before proceeding.
