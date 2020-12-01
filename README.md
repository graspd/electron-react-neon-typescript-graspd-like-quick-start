# electron-react-neon-typescript-graspd-like-quick-start

Boilerplate for creating app using Electron + React + Neon Bindings and TypeScript with extra features. If you are searching for minimal boilerplate template without extra features look at not graspd like version -> [link](https://github.com/graspd/electron-react-neon-typescript-quick-start).

## Customization

To customize your app change:

- App name, author and git links in package.json
- Author in src/native-addon/package.json
- Author in src/native-addon/native/Cargo.toml

## Scripts

```txt
npm run build // That script builds the whole project in performance mode.
npm start // That script runs project.
npm run build-dev // That script builds the whole project in development mode.
npm run build-and-start // Equivalent to: npm run build && npm start.
npm run build-dev-and-start // Equivalent to: npm run build-dev && npm start.
npm run scan-dependencies // That script checks for newest version of JS packages in root and native-addon directories.
npm run update-dependencies // That script updates JS packages in root and native-addon directories.
npm run audit-dependencies // That script checks vulnebilities in project.
npm run depcheck // That script shows unused dependencies.
npm run package-mac // That script packs project for macOS.
npm run package-linux // That script packs project for Linux.
npm run package-win-64 // That script packs project for 64-bit Windows.
npm run package-win-32 // That script packs project for 32-bit Windows.
```

## Technical things

### Source code structure

```txt
  | src
    | main // main process
      | index.ts // main process entrypoint
    | native-addon // native addon that uses neon-bindings
      | native
        | src
          | lib.rs // rust entrypoint
        | build.rs // rust build script
        | Cargo.toml // rust config
        | Cargo.lock
      | package.json
    | preload // preload
      | preload.ts // preload entrypoint
    | render // render process
      | index.tsx // render process entrypoint
      | App.tsx // App component
    | public // folder with html, images, etc.
      | index.html // entypoint for HtmlWebpackPlugin
    | global.d.ts // types for native-addon and other untyped third party libraries
  | audit-ci.json // config to audit dependencies
  | package-lock.json
  | package.json
  | tsconfig.json // config for TypeScript
  | webpack.config.ts // config for Webpack
```

### Output structure

```txt
  | dist
    | main
      | index.js
      | index.js.map
      | randomnumbers.node // (if native addon is imported)
    | preload
      | preload.js
    | public
      | index.html
    | renderer
      | index.js
      | index.js.LICENSE.txt
      | index.js.map
```

### Webpack

Webpack configuration uses swc instead of babel to speed up build process.

Used loaders:
- swc-loader
- node-loader

### Used packages

Root folder:
  - dependencies:
    - electron-is-dev
    - native-addon
    - react
    - react-dom
    - react-helmet-async
    - react-router-dom
    - source-map-support
    - styled-components
  - devDependencies:
    - @swc/cli
    - @swc/core
    - @swc/helpers
    - @types/node
    - @types/react
    - @types/react-dom
    - @types/source-map-support
    - @types/terser-webpack-plugin
    - audit-ci
    - better-docs
    - clean-webpack-plugin
    - depcheck
    - electron
    - electron-build-env
    - electron-packager
    - html-webpack-plugin
    - jsdoc
    - lighthouse
    - neon-cli
    - node-loader
    - npm-check-updates
    - source-map-loader
    - spectron
    - swc-loader
    - terser-webpack-plugin
    - ts-node
    - typescript
    - webpack
    - webpack-cli
    
Native addon directory:
  - js:
    - dependencies:
      - neon-cli
  - rust:
    - dependencies:
      - neon
    - devDependencies:
      - neon-build

## Authors

Krzysztof Zawisła, Aurelia Korbela
