📘 Project README
This project is built with Vite, React, and TypeScript, following a clean and scalable file architecture inspired by modern frameworks like Next.js.
test

📂 Project Structure
src/
 
 ├─ hooks/               # Custom React hooks
 
 ├─ components/
 
 │   ├─ ui/              # Reusable, atomic UI components
 
 │   └─ [feature]/       # Feature-specific or composite components (built from ui/)
 
 ├─ pages/               # App pages, routed automatically (via generouted)
 
 ├─ assets/              # Static assets (images, fonts, etc.)
 
 ├─ styles/              # Global and modular styles
 
 ├─ lib/                 # Utilities and helper functions
 
 ├─ types/               # Global TypeScript types/interfaces

 └─ main.tsx             # App entry point

✅ Routing
Routing is file-based and handled by generouted.

Do not create a custom router.ts. Pages inside src/pages are automatically converted to routes — just like Next.js.

File and folder names inside pages/ define your routes.


Example:

src/pages/index.tsx       → `/`

src/pages/about.tsx       → `/about`

src/pages/blog/[id].tsx   → `/blog/:id`


✅ Components

components/ui/ — for atomic, reusable UI elements (buttons, inputs, icons, cards, etc.)

Naming: PascalCase folder and file names.

Example: Button.tsx, Input.tsx, Card.tsx.


components/[feature]/ — for feature-specific or composite components.

These are usually built by composing multiple ui components.

Naming: PascalCase folder and file names.

Example: Navbar.tsx, Sidebar.tsx, ProfileCard.tsx.


✅ Hooks

hooks/ — for custom React hooks.

Naming: Prefix files with use.

Example: useAuth.ts, useDebounce.ts, useFetch.ts.


✅ Pages

Located inside src/pages/.

Treated as route entry points.

Naming: kebab-case or PascalCase for folders; files as PascalCase or index.tsx.

Dynamic routes: Use [param] syntax.

Example: blog/[id].tsx.


✅ Other Conventions

Assets: Store static files in src/assets/. Organize by type if needed (images/, icons/, fonts/).

Styles: Use src/styles/ for global styles, resets, variables, or Tailwind config if used.

Types: Store shared TypeScript types and interfaces in src/types/.


✅ Font Usage

Use font-fraunces for headers

Use font-futura for usual text

Use inter when futura doesn't fit well


⚙️ Recommended Naming Rules

Files & Folders: PascalCase for React components, hooks, and pages. Use [param] for dynamic routes.

Variables, functions, props: camelCase.

Environment variables: UPPER_SNAKE_CASE.


🧩 Tips

Keep UI components small and reusable.

Keep hooks pure and isolated.

Keep pages focused on layout and page-level data fetching.

Compose larger components inside the components/ root using ui/ parts.


📦 Dependencies

This project uses:

Vite — fast dev server and build tool.

React — UI library.

TypeScript — type safety.

generouted — zero-config file-based routing.

🚀 Happy building!

 Keep it modular, readable, and maintainable.



# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
