# three.js-practice

A simple, responsive 3D text demo built with [Three.js](https://threejs.org/) and [Vue 3](https://vuejs.org/), deployed to GitHub Pages.

## 🚀 Demo

[Live Demo](https://putkovamariia.github.io/three.js-practice/)

## Features

- 3D text rendered with Three.js
- Responsive design for desktop and mobile
- Editable text input with instant 3D update
- OrbitControls for interactive rotation
- Deployed to GitHub Pages

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or newer recommended)
- [npm](https://www.npmjs.com/)

### Install

```bash
npm install
```

### Run Locally

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

### Lint and Format

```bash
npm run lint
npm run format
```

## Deployment

This project is automatically deployed to GitHub Pages using a GitHub Actions workflow.  
The production build is served from the `/three.js-practice/` subdirectory.

## Folder Structure

```
public/
  fonts/
    helvetiker_regular.typeface.json
src/
  components/
    EditField.vue
    Name3D.vue
  main.ts
  App.vue
```

## Customization

- To change the default 3D text, edit the initial value in `Name3D.vue`.
- To use a different font, add your `.typeface.json` file to `public/fonts/` and update the loader path.

## Credits

- [Three.js](https://threejs.org/)
- [Vue 3](https://vuejs.org/)
- [helvetiker_regular.typeface.json](https://threejs.org/examples/fonts/helvetiker_regular.typeface.json)
