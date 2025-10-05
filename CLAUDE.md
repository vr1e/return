# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React + TypeScript web application for Serbian text transliteration between Cyrillic and Latin scripts. The site is hosted at return.rs and deployed on Netlify.

## Development Commands

- **Start dev server**: `npm run dev` (runs Vite dev server)
- **Build for production**: `npm run build` (outputs to `build/` directory)
- **Preview production build**: `npm run preview`

## Technology Stack

- **Build tool**: Vite 3 (migrated from Webpack)
- **Framework**: React 18 with TypeScript
- **Routing**: React Router DOM v6
- **Styling**: styled-components + SCSS
- **Visual effects**: tsparticles for background particle effects
- **Code formatting**: Prettier (configured in package.json with tabs, single quotes)

## Architecture

### Entry Point

- `index.html` → `src/main.tsx` → `src/App.tsx`
- React StrictMode is enabled

### Core Application Structure

**App.tsx** is the root component that:

- Configures tsparticles background animation (using `particleConfig.ts`)
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

**Transliteration Logic** (`src/helpers/`):

- `transliterateToCyrillic.ts` - Latin → Cyrillic conversion with special handling for digraphs (dž → џ, lj → љ, nj → њ)
- `transliterateToLatin.ts` - Cyrillic → Latin conversion
- `isUpperCase.ts` - Utility for case checking
- Both use character mapping matrices and handle Serbian-specific letter combinations

### Build Configuration

**vite.config.ts**:

- Uses `@vitejs/plugin-react`
- Custom build output directory: `build/` (instead of default `dist/`)

**tsconfig.json**:

- Target: ESNext
- Strict mode enabled
- React JSX transform (`"jsx": "react-jsx"`)
- Only includes `./src/` directory

### Styling Approach

- Mix of styled-components (for component-specific styles) and global SCSS (`src/index.scss`)
- Prettier enforces consistent formatting (tabs, single quotes, no trailing commas)

## Important Notes

- The README mentions `src/index.html` and `src/index.js` as required files, but the actual entry point is `index.html` at root and `src/main.tsx`
- There are no tests configured (`npm test` exits with error)
- Node version is specified in `.nvmrc`
