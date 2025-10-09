# Return

[![Netlify Status](https://api.netlify.com/api/v1/badges/66bfde30-e830-4dd6-a39e-50998e0679d8/deploy-status)](https://app.netlify.com/sites/suspicious-roentgen-45df9b/deploys)

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
- @tsparticles v3

## 🔲 App structure

For the project to build, **these files must exist with exact filenames**:

- `index.html` page template (at root);
- `src/main.tsx` TypeScript entry point.

### Project Tree

```
.
├── index.html                      # Root HTML template
├── package.json                    # Dependencies and scripts
├── vite.config.ts                  # Vite configuration
├── vitest.config.ts                # Vitest test configuration
├── tsconfig.json                   # TypeScript configuration
├── .nvmrc                          # Node version specification
├── CLAUDE.md                       # AI assistant guidance
├── README.md                       # Project documentation
├── LICENSE                         # MIT license
│
└── src/
    ├── main.tsx                    # Application entry point
    ├── App.tsx                     # Root component with routing
    ├── index.css                   # Global styles with CSS variables
    ├── vite-env.d.ts              # Vite type definitions
    │
    ├── config/
    │   └── particles.ts            # tsparticles configuration
    │
    ├── components/
    │   ├── Home.tsx                # Home page component
    │   ├── Transliterate.tsx       # Transliteration page container
    │   ├── Transliterate.module.css
    │   │
    │   ├── contexts/
    │   │   └── TransliterateContext.tsx  # Shared state provider
    │   │
    │   └── partials/
    │       ├── Cyrillic.tsx        # Cyrillic input panel
    │       ├── Latin.tsx           # Latin input panel
    │       ├── Convert.tsx         # Convert button component
    │       └── Convert.module.css  # Convert component styles
    │
    ├── helpers/
    │   └── containsUpperCase.ts   # Text utility functions
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

Runs the test suite using Vitest.

### `npm run preview`

Locally preview the production build after running `npm run build`.

## Dev config

There are Prettier code formatting rules set inside package.json file for use with [Prettier](https://prettier.io/) inside your code editor.

## License

MIT
