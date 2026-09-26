# 🚀 SpaceXKata

A modern, high-performance Angular application designed to browse and manage SpaceX launch operations.

## ✨ Key Features

* **Signal Architecture:** Employs reactive signals (`signal`, `computed`, `input`) for granular,
  performant rendering.
* **State Management:** Powered by `@ngrx/signals` (`signalStore`) providing global singletons and optimized reactive
  computed selectors.
* **Local Storage Sync:** Automatic client-side caching of favorite launches via synchronized state effects.

---

## 💻 Local Setup & Installation

Follow these straightforward instructions to set up and run the application locally on your machine.

### Prerequisites

Ensure you have the following software installed locally:

* [Node.js](https://nodejs.org) (^20.19.0 || ^22.12.0 || ^24.0.0)
* [npm](https://npmjs.com) (bundled with Node)

### 1. Clone the Repository

```bash
git clone https://github.com/FabianaRBarros/pdi
cd pdi
```

### 2. Install Dependencies

Install all project dependencies using npm:

```bash
npm install
```

### 3. Start the Development Server

Run the application locally in development mode:

```bash
npm run start
```

Once compilation finishes, open your browser and navigate to **`http://localhost:4200/`**. The application will
automatically reload if you modify any source files.

---

## 🧪 Testing and Quality Gates

The project uses **Vitest** for running quick, asynchronous, and isolated microtask tests without legacy Zone.js
constraints.

### Run Unit Tests

Execute the automated test suite through the command line terminal:

```bash
npm run test
```

## 📦 Production Build & Deployment

To prepare the application for production, you need to compile a highly optimized production bundle.

### 1. Build the Project

Run the build script to compile the application:

```bash
npm run build
```

This command triggers Ahead-of-Time (AOT) compilation, applies code-splitting, minifies the bundles, and outputs the
static assets to the `dist/spaceX_kata/browser` directory.

### 2. Deployment Strategies

Since Angular is a Single Page Application (SPA), the generated `dist/` directory consists purely of static assets
(`HTML`, `JS`, `CSS`, images). You can deploy it to any static hosting provider.