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

## Technology Stack

- **Build tool**: Vite 7 (migrated from Webpack)
- **Framework**: React 18 with TypeScript
- **Routing**: React Router DOM v7
- **Styling**: CSS Modules + plain CSS with CSS custom properties
- **Visual effects**: @tsparticles v3 for background particle effects (using @tsparticles/react, @tsparticles/engine, @tsparticles/slim)
- **Analytics**: insights-js for privacy-focused web analytics
- **Testing**: Vitest with @testing-library/react, jsdom, and v8 coverage
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
- Uses `TransliterateContext` for state management between input/output components
- Grid layout with two columns: Cyrillic and Latin input/output panels
- Core components:
  - `Cyrillic.tsx` - Cyrillic text input panel
  - `Latin.tsx` - Latin text input panel
  - `TransliterateContext.tsx` - Shared state provider

**Transliteration Logic**:

- Uses `serbian-transliterate` npm package for bidirectional conversion
- Handles Serbian-specific digraphs (dž → џ, lj → љ, nj → њ) automatically
- Helper function `containsUpperCase.ts` for case checking during text replacement
- Context manages state and applies transliteration via `transliterate(text, 'toLatin')` or `transliterate(text, 'toCyrillic')`

### Analytics Integration

**Configuration** (Environment Variables):

- Analytics uses Insights.io for privacy-focused tracking
- Project ID is stored in `.env.local` as `VITE_INSIGHTS_PROJECT_ID`
- Get project ID from https://getinsights.io
- Analytics is automatically disabled in development mode (`import.meta.env.DEV`)

**Analytics Utility** (`src/utils/analytics.ts`):

- `initAnalytics()` - Initializes Insights with project ID and config
- `enablePageTracking()` - Enables automatic page view tracking
- `trackTransliteration()` - Tracks transliteration usage with parameters (direction, text length)
- `trackNavigation()` - Tracks navigation between pages
- `trackEvent()` - Generic custom event tracking
- `isAnalyticsEnabled()` - Check if analytics is active

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

### Styling Approach

- **CSS Modules** for component-specific styles (e.g., `Transliterate.module.css`, `Convert.module.css`)
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
- **Unit and component tests** co-located with source files:
  - `src/helpers/containsUpperCase.test.ts` - Helper function tests
  - `src/components/contexts/TransliterateContext.test.tsx` - Context state management
  - `src/components/partials/Cyrillic.test.tsx` - Cyrillic input panel
  - `src/components/partials/Latin.test.tsx` - Latin input panel

**Coverage Metrics** (core functionality):

- Statements: 88%+
- Branches: 91%+
- Lines: 88%+

**What's Tested**:

- Cyrillic ↔ Latin transliteration with Serbian digraphs (dž, lj, nj)
- Case sensitivity handling
- Helper functions (containsUpperCase)
- React component rendering and interactions
- Context state management and auto-transliteration
- User interactions (text input)

**Running Tests**:

- `npm test` - Watch mode for development
- `npm run test:coverage` - Full coverage report

## Important Notes

- The README mentions `src/index.html` and `src/index.js` as required files, but the actual entry point is `index.html` at root and `src/main.tsx`
- Node version is specified in `.nvmrc` (v22)
- Test files use `.test.ts` or `.test.tsx` extension
- Test organization: integration tests in `__tests__/`, unit/component tests co-located with source files
