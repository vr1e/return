# Return

[![Netlify Status](https://api.netlify.com/api/v1/badges/66bfde30-e830-4dd6-a39e-50998e0679d8/deploy-status)](https://app.netlify.com/sites/suspicious-roentgen-45df9b/deploys)
[![CI](https://github.com/vr1e/return/workflows/CI/badge.svg)](https://github.com/vr1e/return/actions)

A web application for Serbian text transliteration between Cyrillic and Latin scripts.

🌐 **Live Demo**: [https://www.return.rs](https://www.return.rs)

## ✨ Features

- Real-time bidirectional transliteration between Serbian Cyrillic and Latin alphabets
- Proper handling of Serbian-specific digraphs (dž, lj, nj)
- Interactive particle background effects
- Clean, responsive interface

## 🛠️ Tech Stack

- React 18 + TypeScript
- Vite 7
- React Router DOM v7
- CSS Modules + CSS Custom Properties
- FontAwesome v7
- @tsparticles v3
- ESLint 9 (TypeScript ESLint strict, React plugins)

## 🔲 App structure

For the project to build, **these files must exist with exact filenames**:

- `index.html` page template (at root);
- `src/main.tsx` TypeScript entry point.

### Project Tree

```
.
├── public/
│   └── _redirects                  # Netlify redirect rules for SPA routing
├── index.html                      # Root HTML template
├── package.json                    # Dependencies and scripts
├── vite.config.ts                  # Vite configuration
├── vitest.config.ts                # Vitest test configuration
├── tsconfig.json                   # TypeScript configuration
├── eslint.config.js                # ESLint 9 flat config
├── .nvmrc                          # Node version specification
├── CLAUDE.md                       # AI assistant guidance
├── README.md                       # Project documentation
├── LICENSE                         # MIT license
│
├── __tests__/                      # Integration tests and test setup
│   ├── setup.ts                    # Vitest setup file
│   ├── transliteration.test.ts     # Transliteration logic tests
│   └── accessibility.test.tsx      # Accessibility compliance tests
│
└── src/
    ├── main.tsx                    # Application entry point
    ├── App.tsx                     # Root component with routing
    ├── index.css                   # Global styles with CSS variables
    ├── vite-env.d.ts              # Vite type definitions
    │
    ├── config/
    │   ├── env.ts                  # Environment variable utilities
    │   └── particles.ts            # tsparticles configuration
    │
    ├── contexts/
    │   └── TransliterateContext.tsx # Shared state provider (useReducer)
    │
    ├── hooks/
    │   ├── useAutoResize.ts        # Textarea auto-resize hook
    │   └── useTransliterate.ts     # Context access hook
    │       └── useTransliterate.test.tsx
    │
    ├── services/
    │   └── analytics.ts            # Analytics service singleton
    │
    ├── components/
    │   ├── Home.tsx                # Home page component
    │   ├── LanguageTextarea.tsx    # Reusable textarea component
    │   ├── LanguageTextarea.test.tsx
    │   ├── Transliterate.tsx       # Transliteration page container
    │   ├── Transliterate.module.css
    │   │
    │   └── partials/
    │       ├── Cyrillic.tsx        # Cyrillic input panel
    │       ├── Cyrillic.test.tsx   # Cyrillic component tests
    │       ├── Latin.tsx           # Latin input panel
    │       ├── Latin.test.tsx      # Latin component tests
    │       ├── Convert.tsx         # Convert button component
    │       └── Convert.module.css  # Convert component styles
    │
    ├── helpers/
    │   ├── containsUpperCase.ts        # Text utility functions
    │   └── containsUpperCase.test.ts   # Helper function tests
    │
    └── assets/                     # Static assets (favicons, images, etc.)
        ├── return.png              # Logo image
        ├── favicon.ico
        ├── manifest.json
        └── ...                     # Other icons and metadata
```

## 📋 Prerequisites

- Node.js 22

## 🚧 Install the dependencies

```
$ cd project
$ npm install
```

## 🚀 Available Scripts

In the project directory, you can run:

### `npm run dev`

Launches the Vite dev server and starts the app in development mode.<br>
Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any errors in the console.

### `npm run build`

Builds the app for production to the `dist` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.

### `npm test`

Runs the test suite in watch mode using Vitest.

### `npm run test:coverage`

Runs the test suite with coverage reporting. Generates an HTML report in the `coverage/` directory.

**Coverage Thresholds:**

- Statements: 88%+
- Branches: 91%+
- Functions: 57%+
- Lines: 88%+

**What's Tested:**

- Transliteration logic (Cyrillic ↔ Latin conversion, Serbian digraphs)
- Helper functions (containsUpperCase)
- React components (LanguageTextarea, Cyrillic, Latin)
- Custom hooks (useTransliterate)
- Reducer-based state management
- User interactions (text input, copy buttons, keyboard shortcuts)
- Accessibility compliance (ARIA labels, live regions, keyboard navigation)

**Test Files:**

- `__tests__/transliteration.test.ts` - Integration tests for transliteration logic
- `__tests__/accessibility.test.tsx` - Accessibility compliance tests
- `src/helpers/containsUpperCase.test.ts` - Unit tests (co-located)
- `src/components/LanguageTextarea.test.tsx` - LanguageTextarea component tests
- `src/components/partials/Cyrillic.test.tsx` - Component tests (co-located)
- `src/components/partials/Latin.test.tsx` - Component tests (co-located)
- `src/hooks/useTransliterate.test.tsx` - Hook tests (co-located)

### `npm run preview`

Locally preview the production build after running `npm run build`.

### `npm run lint`

Runs ESLint on all source files to check for code quality issues and potential errors.

### `npm run lint:fix`

Runs ESLint with automatic fixes enabled. This will automatically fix many common code quality issues.

## Dev config

**Prettier** code formatting rules are configured in package.json for use with [Prettier](https://prettier.io/) in your code editor.

**ESLint** is configured with TypeScript ESLint strict rules, React and React Hooks plugins. Configuration is in `eslint.config.js` (ESLint 9 flat config format).

## License

MIT
