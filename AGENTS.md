# AGENTS.md

## Stack

React 19 + Vite 8, **JavaScript** (no TypeScript), Tailwind CSS v4, shadcn/ui (base-nova style, JS), TanStack React Query, React Router v7, Axios, Lucide icons.

## Commands

- `npm run dev` — Vite dev server
- `npm run build` — production build
- `npm run lint` — oxlint (React + oxc plugins; see `.oxlintrc.json`)
- No test runner configured
- No TypeScript typecheck (project uses JS with jsconfig.json)

## Path alias

`@` maps to `src/` (configured in both `vite.config.js` and `jsconfig.json`). Always use `@/...` for imports within `src/`.

## shadcn/ui

- Config: `components.json` (style: `base-nova`, tsx: false)
- Add components via: `npx shadcn@latest add <component>`
- UI components live in `src/components/ui/`
- Utils (`cn` helper) in `src/lib/utils`

## Project structure

```
src/
  api/        — Axios instance, auth, request helpers
  components/ — Reusable components (ui/ for shadcn)
  data/       — Static data
  hooks/      — Custom React hooks
  lib/        — Utilities (shadcn utils)
  pages/      — Page-level components
  routes/     — React Router config (Routes.jsx, Auth.jsx)
  styles/     — global.css (Tailwind entry)
  utils/      — General utilities
```

## Key conventions

- Entry: `src/main.jsx` wraps app in `QueryClientProvider` then `RouterProvider`
- Routing defined in `src/routes/`, exported via `src/routes/index.jsx`
- API layer in `src/api/axios.js` — check for base URL / interceptors before adding requests
- CSS: Tailwind v4 via `@tailwindcss/vite` plugin (no tailwind.config file; config is in CSS)
- Lint: oxlint only (no ESLint/Prettier)

## Gotchas

- No `.env.example` — check `.env` for required env vars before assuming they exist
- React Compiler is **not** enabled
- Lint (`npm run lint`) is the only automated quality gate; run it before commits
