# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal website built with React and TypeScript. A static site designed to showcase accomplishments, skills, and experience, with plans to add a blog later. Deployed to Vercel at https://markdrohan.vercel.app

## Architecture

**Stack:**
- **Frontend**: React 19.2 with TypeScript in strict mode
- **Styling**: CSS
- **Deployment**: Vercel (automated on push to main)
- **Analytics**: Vercel Speed Insights

**Key Structure:**
- `src/App.tsx` - Main React component
- `src/` - All source code
- `public/` - Static assets
- `.github/workflows/` - CI/CD pipelines

## Quick Start

Run locally:
```bash
npm install
npm start
```

Visit http://localhost:3000

## Development Commands

**Run tests:**
```bash
npm test
```

**Format code:**
```bash
npm run format
```

**Check formatting:**
```bash
npm run format:check
```

**Lint:**
```bash
npm run lint
```

**Auto-fix linting:**
```bash
npm run lint:fix
```

**Build:**
```bash
npm run build
```

## Code Quality Standards

### TypeScript

- **Strict mode enabled** in tsconfig.json
- **Explicit return types required** for all functions (ESLint enforced)
- Use `React.JSX.Element` for component return types (not bare `JSX.Element`)
- Import React when using `React.JSX.Element` type annotation
- No `any` types allowed
- No non-null assertions
- Unused variables must be prefixed with `_`

### Before Completing Any Task

**ALWAYS run all quality checks before considering a task complete:**

```bash
npm test -- --watchAll=false     # Tests must pass
npm run format:check              # Formatting must be correct
npm run lint                      # Linting must pass
npm run build                     # Build must succeed
```

If any check fails:
1. Fix the issues (use `npm run format` for auto-fixing formatting)
2. Re-run all checks
3. Only mark the task as complete when ALL checks pass

**Why this matters:** All PRs require these checks to pass in GitHub Actions. If your code fails locally, it will fail in CI/CD and block merging.

## Important Technical Details

### React + TypeScript Type Issue

When adding explicit return types to React components:
- ❌ `function App(): JSX.Element` (causes TS2503 error)
- ✅ `function App(): React.JSX.Element` (requires React import)

Always import React when using `React.JSX.Element`:
```typescript
import React from 'react';

function App(): React.JSX.Element {
  // component code
}
```

### ESLint Configuration

Custom rules enforced (see `.eslintrc.json`):
- Explicit function return types required
- No console logs (warnings)
- No debugger statements
- Prefer const over let
- Prettier integration

## Deployment

The site is deployed to Vercel at https://markdrohan.vercel.app and automatically redeploys when changes are pushed to the `main` branch. No manual deployment commands are needed.

## GitHub Actions Workflows

### PR Checks (Required for Merge)
- **Frontend Tests** - Runs tests with coverage
- **Frontend Linting** - ESLint checks
- **Frontend Formatting** - Prettier formatting checks
- **Frontend Build** - Ensures production build succeeds

All workflows only run when relevant files change to save CI/CD minutes.

## Vercel Speed Insights

The site includes Vercel Speed Insights for performance monitoring. The `<SpeedInsights />` component is added in `src/App.tsx` and automatically tracks page load performance metrics in production.
