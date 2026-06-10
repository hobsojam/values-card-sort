# Values Card Sort — Claude Context

@CLAUDE_SECURITY.md

## Project Overview

A client-only React single-page application for the values card sort exercise. No server, no database — all state lives in the browser for the duration of a session.

## Stack

- **React 19** with JSX (`.jsx` files)
- **Vite 8** for dev server and build
- **dnd-kit** for drag-and-drop (packages: `@dnd-kit/core`, `@dnd-kit/sortable`, `@dnd-kit/utilities`)
- **nginx** to serve the static build in Docker

## Architecture

Client-only static site — no server, no database. All state is in-memory for the duration of a browser session.

```text
Browser (React SPA)
  └── Phase state (sort → narrow → reflect)
        └── Value cards loaded from src/data/values.js (static, baked into build)
```

Build pipeline: Vite compiles JSX and bundles assets into `dist/`. In Docker, nginx serves `dist/` as static files on port 80 (mapped to 3000 via docker-compose).

## Structure

```text
values-card-sort/
├── src/
│   ├── main.jsx          # React entry point, mounts <App />
│   ├── App.jsx           # Top-level component, owns phase state
│   ├── data/
│   │   └── values.js     # Array of value card definitions
│   ├── components/       # UI components
│   └── styles/           # CSS
├── index.html
├── package.json
├── vite.config.js
├── Dockerfile
└── docker-compose.yml
```

## Phases

1. **Sort** — drag all cards into Not Important / Important / Very Important columns
2. **Narrow** — from Very Important, pick top 5
3. **Reflect** — display final values with descriptions

## Development Commands

```bash
npm install
npm run dev      # Vite dev server at http://localhost:5173
npm run build    # production build → dist/
npm run preview  # preview production build locally
```

Docker:

```bash
docker compose up --build   # builds and serves on http://localhost:3000
```

## Testing

```bash
npm test         # vitest run (unit tests)
```

Tests live alongside source files as `*.test.jsx`. Run `npm test` before opening a PR to verify component logic.

## Conventions

- Plain JavaScript throughout — no TypeScript
- No comments unless the why is non-obvious
- No linting config — keep it minimal
- State flows down via props; no global state library needed for this scope
- Each value card object: `{ id, name, description }`

## Dependency Changes

When adding or removing npm packages, do all installs and uninstalls in one pass, then verify the lock file is clean before committing:

```bash
# Good — single pass
npm install pkg-a pkg-b && npm uninstall pkg-c

# If you've made multiple separate npm calls, regenerate the lock file:
rm package-lock.json && npm install
```

Always commit both `package.json` and `package-lock.json` together.

Use `npm install` rather than `npm ci` in CI. The lock file is generated on Windows and does not contain Linux-specific optional packages that `npm ci` on Linux requires. `npm install` uses the lock file for exact versions of everything it can, and resolves platform-specific optional packages for the current environment.

## Git Workflow

- Feature work on `feat/<short-description>` branches, PRs targeting `master`
- Never commit directly to `master`
- Always include the co-author trailer in commit messages:
  ```text
  Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
  ```
- Never force-push to `master`

## Shell Tool Selection (Windows)

This project runs on Windows with PowerShell as the login shell.

| What you need | Use |
|---|---|
| `git`, `gh`, `npm`, `node`, `docker` | `Bash` tool (POSIX shell, same commands on any OS) |
| File ops: search, read, edit, write | Dedicated tools (`Grep`, `Read`, `Edit`, `Write`, `Glob`) — never `Bash` or `PowerShell` |
| Windows-only tasks (registry, COM, etc.) | `PowerShell` tool |
| Everything else | `Bash` tool first; fall back to `PowerShell` only if Bash fails |

Do not mix shells in a single logical operation.
