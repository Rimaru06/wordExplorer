# SearchAnyMeaning

A modern, minimal React + TypeScript web app for looking up word meanings, built with Vite and Tailwind CSS.

## Features

- 🔍 Search for the meaning of any word or phrase
- ⚡ Fast, responsive UI with React 19 and Tailwind CSS 4
- 🎨 Clean, accessible design
- 📚 Results include definitions, and support for synonyms, examples, and part of speech (if available)
- 🌐 Powered by [searchanymeaning.onrender.com](https://searchanymeaning.onrender.com) API

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or newer recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

```sh
git clone https://github.com/yourusername/searchfrontend.git
cd searchfrontend
npm install
```

### Development

Start the development server:

```sh
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build

To build for production:

```sh
npm run build
```

To preview the production build:

```sh
npm run preview
```

### Lint

To lint the codebase:

```sh
npm run lint
```

## Project Structure

```
src/
  App.tsx                # Main app component
  main.tsx               # Entry point
  index.css              # Tailwind and custom styles
  components/
    dictionary-lookup.tsx  # Dictionary search UI
public/
  vite.svg               # Favicon
```

## Configuration

- **Vite** for fast bundling and HMR ([vite.config.ts](vite.config.ts))
- **TypeScript** strict mode ([tsconfig.app.json](tsconfig.app.json))
- **ESLint** for code quality ([eslint.config.js](eslint.config.js))
- **Tailwind CSS** for utility-first styling

## Credits

- [Lucide Icons](https://lucide.dev/) for UI icons
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/)
- [React](https://react.dev/)

---

MIT License
