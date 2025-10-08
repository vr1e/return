# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React + TypeScript web application for Serbian text transliteration between Cyrillic and Latin scripts. The site is hosted at return.rs and deployed on Netlify.

## Development Commands

- **Start dev server**: `npm run dev` (runs Vite dev server)
- **Build for production**: `npm run build` (outputs to `dist/` directory - Vite default)
- **Preview production build**: `npm run preview`
- **Run tests**: `npm test` (runs Vitest test suite)

## Technology Stack

- **Build tool**: Vite 7 (migrated from Webpack)
- **Framework**: React 18 with TypeScript
- **Routing**: React Router DOM v7
- **Styling**: CSS Modules + plain CSS with CSS custom properties
- **Visual effects**: @tsparticles v3 for background particle effects (using @tsparticles/react, @tsparticles/engine, @tsparticles/slim)
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

## Important Notes

- The README mentions `src/index.html` and `src/index.js` as required files, but the actual entry point is `index.html` at root and `src/main.tsx`
- Tests are configured with Vitest (`npm test`)
- Node version is specified in `.nvmrc` (v22)
