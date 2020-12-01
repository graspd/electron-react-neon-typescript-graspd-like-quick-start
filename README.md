# electron-react-neon-typescript-graspd-like-quick-start

Boilerplate for creating app with Electron + React + Neon Bindings and TypeScript with extra features. If you are searching for minimal boilerplate template without extra features look at not graspd like version -> [link](https://github.com/graspd/electron-react-neon-typescript-quick-start)

## Customization

To customize your app change:

- App name, author and git links in package.json
- Author in src/native-addon/package.json
- Author in src/native-addon/native/Cargo.toml

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

Webpack configuration using swc instead of babel to speed up build process.

```

```
