# Return

[![Netlify Status](https://api.netlify.com/api/v1/badges/66bfde30-e830-4dd6-a39e-50998e0679d8/deploy-status)](https://app.netlify.com/sites/suspicious-roentgen-45df9b/deploys)
[![CI](https://github.com/vr1e/return/workflows/CI/badge.svg)](https://github.com/vr1e/return/actions)

A web application for Serbian text transliteration between Cyrillic and Latin scripts.

🌐 **Live Demo**: [https://www.return.rs](https://www.return.rs)

## ✨ Features

- Real-time bidirectional transliteration (Cyrillic ↔ Latin)
- Proper handling of Serbian digraphs (dž, lj, nj)
- Interactive particle background effects
- Responsive interface with keyboard shortcuts

## 🛠️ Tech Stack

- React 19 + TypeScript + Vite 7
- React Router DOM v7
- CSS Modules + Custom Properties
- @tsparticles v3
- Vitest + Testing Library
- ESLint 9 + Prettier 3

## 📋 Prerequisites

- Node.js 22

## 🚧 Quick Start

```bash
npm install
npm run dev      # Start dev server at http://localhost:5173
npm run build    # Build for production (outputs to dist/)
npm test         # Run test suite
```

## 🚀 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm test` | Run tests once |
| `npm run test:coverage` | Run tests with coverage report |
| `npm run lint` | Check code quality |
| `npm run lint:fix` | Auto-fix linting issues |
| `npm run format` | Format code with Prettier |
| `npm run format:check` | Check code formatting (CI) |
| `npm run typecheck` | Check TypeScript types |

## 🔲 Project Structure

```
.
├── index.html                      # Entry point
├── src/
│   ├── main.tsx                    # React app entry
│   ├── App.tsx                     # Root component with routing
│   ├── components/                 # React components
│   ├── contexts/                   # State management (useReducer)
│   ├── hooks/                      # Custom React hooks
│   ├── services/                   # Analytics, etc.
│   ├── config/                     # App configuration
│   └── helpers/                    # Utility functions
├── __tests__/                      # Integration tests
└── .github/workflows/              # CI/CD configuration
```

## 🧪 Testing

Tests cover transliteration logic, components, hooks, accessibility, and user interactions.

**Coverage Thresholds**: 88%+ statements/lines, 91%+ branches

```bash
npm run test:coverage  # Generate HTML report in coverage/
```

## 🔄 CI/CD

GitHub Actions runs 5 parallel checks on PRs to `master`:

1. **Test** - Vitest suite
2. **Build** - Production build validation
3. **Type Check** - TypeScript compiler
4. **Lint** - ESLint code quality
5. **Format** - Prettier check (advisory only)

First 4 must pass before merging.

## 📄 License

MIT
