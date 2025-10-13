# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React + TypeScript web application for Serbian text transliteration between Cyrillic and Latin scripts. The site is hosted at return.rs and deployed on Netlify.

## Development Commands

- **Start dev server**: `npm run dev` (runs Vite dev server)
- **Build for production**: `npm run build` (outputs to `dist/` directory - Vite default)
- **Preview production build**: `npm run preview`
- **Run tests**: `npm test` (runs Vitest test suite in watch mode)
- **Test with coverage**: `npm run test:coverage` (generates coverage report in `coverage/` directory)
- **Lint code**: `npm run lint` (runs ESLint on all source files)
- **Lint and auto-fix**: `npm run lint:fix` (runs ESLint with automatic fixes)

## Technology Stack

- **Build tool**: Vite 7 (migrated from Webpack)
- **Framework**: React 18 with TypeScript
- **Routing**: React Router DOM v7
- **Styling**: CSS Modules + plain CSS with CSS custom properties
- **Visual effects**: @tsparticles v3 for background particle effects (using @tsparticles/react, @tsparticles/engine, @tsparticles/slim)
- **Analytics**: insights-js for privacy-focused web analytics
- **Testing**: Vitest with @testing-library/react, jsdom, and v8 coverage
- **Code quality**: ESLint 9 with TypeScript ESLint strict rules, React and React Hooks plugins
- **Code formatting**: Prettier (configured in package.json with tabs, single quotes)

## Architecture

### Entry Point

- `index.html` → `src/main.tsx` → `src/App.tsx`
- React StrictMode is enabled

### Core Application Structure

**App.tsx** is the root component that:

- Configures tsparticles background animation (using `config/particles.ts`)
- Sets up BrowserRouter with two routes:
  - `/` - Home page
  - `/cyrillicconvert` - Transliteration tool

**Transliteration System** (`/cyrillicconvert` route):

- Main component: `src/components/Transliterate.tsx`
- Uses `TransliterateContext` (with `useReducer`) for state management
- Grid layout with two columns: Cyrillic and Latin input/output panels
- Core components:
  - `LanguageTextarea.tsx` - Reusable textarea component with copy functionality and auto-resize
  - `Cyrillic.tsx` - Cyrillic text input panel (uses LanguageTextarea)
  - `Latin.tsx` - Latin text input panel (uses LanguageTextarea)
  - `src/contexts/TransliterateContext.tsx` - Shared state provider using reducer pattern

**State Management Architecture**:

- Uses `useReducer` hook for predictable state updates
- State shape: `{ cyrillic: string, latin: string, lastEdit: 'cyrillic' | 'latin' | null }`
- Reducer actions:
  - `SET_CYRILLIC` - Updates Cyrillic text and auto-transliterates to Latin
  - `SET_LATIN` - Updates Latin text and auto-transliterates to Cyrillic
  - `REPLACE_TEXT` - Replaces selected text (for special character buttons)
- `lastEdit` field tracks which textarea was edited last (crucial for analytics)

**Transliteration Logic**:

- Uses `serbian-transliterate` npm package for bidirectional conversion
- Handles Serbian-specific digraphs (dž → џ, lj → љ, nj → њ) automatically
- Helper function `containsUpperCase.ts` for case checking during text replacement
- Reducer applies transliteration via `transliterate(text, 'toLatin')` or `transliterate(text, 'toCyrillic')`

**Custom Hooks**:

- `useTransliterate` - Hook for accessing TransliterateContext with error checking
- `useAutoResize` - Hook for automatically resizing textareas based on content (uses `useLayoutEffect`)

**Reusable Components**:

- **LanguageTextarea** (`src/components/LanguageTextarea.tsx`):
  - Handles both Cyrillic and Latin inputs
  - Features: copy to clipboard, keyboard shortcuts (Ctrl/Cmd+C), auto-resize, focus states
  - Accessibility: ARIA labels, live regions for copy feedback, screen reader announcements
  - Props: id, label, value, onChange, theme ('primary' | 'secondary'), copyButtonText, children

### Analytics Integration

**Configuration** (Environment Variables):

- Analytics uses Insights.io for privacy-focused tracking
- Project ID is stored in `.env.local` as `VITE_INSIGHTS_PROJECT_ID`
- Get project ID from https://getinsights.io
- Analytics is automatically disabled in development mode (`import.meta.env.DEV`)
- Environment variable utility (`src/config/env.ts`) provides runtime validation and type-safe access to env vars

**Analytics Service** (`src/services/analytics.ts`):

- A singleton `AnalyticsService` class that wraps the `insights-js` library.
- The service is exported as a single instance: `analytics`.
- Public methods include:
  - `init()`: Initializes Insights with project ID and config.
  - `trackPages()`: Enables automatic page view tracking.
  - `trackTransliteration()`: Tracks transliteration usage.
  - `trackNavigation()`: Tracks navigation between pages.
  - `trackEvent()`: Tracks a generic custom event.
  - `isEnabled()`: Checks if analytics is active.
  - `reset()`: Resets the service's state (for testing).

**Implementation**:

- Initialized in `App.tsx` on mount via `useEffect`
- Automatic page view tracking enabled for React Router navigation
- Transliteration events tracked in `TransliterateContext.tsx` with 2-second debouncing
- Events include parameters: direction (toLatin/toCyrillic), text length, locale, screen type
- All tracking silently fails if analytics is disabled or project ID not configured

### Build Configuration

**vite.config.ts**:

- Uses `@vitejs/plugin-react`

**tsconfig.json**:

- Target: ESNext
- Strict mode enabled
- React JSX transform (`"jsx": "react-jsx"`)
- Only includes `./src/` directory

**eslint.config.js** (ESLint 9 flat config):

- Extends ESLint recommended, TypeScript ESLint strict, and React recommended configs
- Plugins: `eslint-plugin-react`, `eslint-plugin-react-hooks`
- Custom rules:
  - Disables `react/react-in-jsx-scope` (not needed with new JSX transform)
  - Allows unused vars/args with `_` prefix (e.g., `const { lastEdit: _, ...rest } = state`)
  - Disables `@typescript-eslint/no-unused-expressions` in test files (for assertions like `.toBeNull()`)
- Ignores: `dist/`, `coverage/`, `src/assets/`
- React version detection enabled

### CI/CD Pipeline

**GitHub Actions Workflow** (`.github/workflows/ci.yml`):

- Triggers on pull requests to `master` branch
- Runs 4 parallel jobs: test, build, typecheck, and lint
- All jobs run on `ubuntu-latest`
- Uses a reusable composite action for common setup steps

**Composite Action** (`.github/actions/setup-node/action.yml`):

- Encapsulates common setup steps to reduce duplication
- Steps included:
  - Setup Node.js with `actions/setup-node@v4` (version from package.json, npm cache enabled)
  - Install dependencies with `npm ci`
- Each job must checkout code first with `actions/checkout@v4` before using this action
- Referenced in all workflow jobs via `uses: ./.github/actions/setup-node`

**CI Jobs**:

1. **test** - Runs Vitest test suite with `npm test -- --run`
2. **build** - Validates production build with `npm run build`
3. **typecheck** - Runs TypeScript type checking with `npx tsc --noEmit`
4. **lint** - Runs ESLint with `npm run lint`

All jobs must pass for a PR to be mergeable.

### Styling Approach

- **CSS Modules** for component-specific styles (e.g., `Transliterate.module.css`, `ErrorFallback.module.css`)
- **Global CSS** with CSS custom properties in `src/index.css`
- **CSS Variables** organized by category:
  - Text colors (`--text-primary`, `--text-white`, `--shadow-color`)
  - Background colors (`--background-main`, `--background-overlay`, `--input-background`)
  - Border colors (`--input-border`, `--border-transparent`)
  - Link colors (`--link-default`, `--link-hover`)
  - Theme colors for Cyrillic/Latin panels (`--cyrillic-color`, `--latin-color`, etc.)
  - Spacing scale (`--spacing-none` through `--spacing-2xl`, `--spacing-offset`)
  - Border radius (`--radius-sm`, `--radius-md`)
  - Border widths and dimensions
- Vite supports CSS Modules out of the box (`.module.css` files)
- Prettier enforces consistent formatting (tabs, single quotes, no trailing commas)

## Testing

**Test Configuration** (`vitest.config.ts`):

- Environment: jsdom (for React component testing)
- Setup file: `__tests__/setup.ts` (imports @testing-library/jest-dom)
- Coverage: v8 provider with HTML and text reporters
- Coverage excludes: test files, config files, entry points, assets, and non-core components

**Test Structure** (following common convention):

- **Integration tests** in `__tests__/` directory at root:
  - `__tests__/transliteration.test.ts` - serbian-transliterate package integration
  - `__tests__/accessibility.test.tsx` - Accessibility compliance tests
- **Unit and component tests** co-located with source files:
  - `src/helpers/containsUpperCase.test.ts` - Helper function tests
  - `src/components/LanguageTextarea.test.tsx` - LanguageTextarea component tests
  - `src/components/partials/Cyrillic.test.tsx` - Cyrillic input panel
  - `src/components/partials/Latin.test.tsx` - Latin input panel
  - `src/hooks/useTransliterate.test.tsx` - useTransliterate hook tests

**Coverage Metrics** (core functionality):

- Statements: 88%+
- Branches: 91%+
- Lines: 88%+

**What's Tested**:

- Cyrillic ↔ Latin transliteration with Serbian digraphs (dž, lj, nj)
- Case sensitivity handling
- Helper functions (containsUpperCase)
- React component rendering and interactions (LanguageTextarea, Cyrillic, Latin)
- Context access hooks (useTransliterate)
- Reducer-based state management and auto-transliteration
- User interactions (text input, copy functionality, keyboard shortcuts)
- Accessibility compliance (ARIA labels, live regions, keyboard navigation)

**Running Tests**:

- `npm test` - Watch mode for development
- `npm run test:coverage` - Full coverage report

## Important Notes

- The README mentions `src/index.html` and `src/index.js` as required files, but the actual entry point is `index.html` at root and `src/main.tsx`
- Node version is specified in `.nvmrc` (v22)
- Test files use `.test.ts` or `.test.tsx` extension
- Test organization: integration tests in `__tests__/`, unit/component tests co-located with source files
