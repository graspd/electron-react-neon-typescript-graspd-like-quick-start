# electron-react-neon-typescript-graspd-like-quick-start

Boilerplate for creating app with Electron + React + Neon Bindings and TypeScript with extra features. If you are searching for minimal boilerplate template without extra features look at not graspd like version -> [link](https://github.com/graspd/electron-react-neon-typescript-quick-start)

## Customization

To customize your app change:

- App name, author and git links in package.json
- Author in src/native-addon/package.json
- Author in src/native-addon/native/Cargo.toml

## Technical things

### Structure

```txt
  | dist // output directory
  | node_modules
  | release-builds
    | appname-platform-architecture
  | src
    | main // main process
      | index.ts // main process entrypoint
    | native-addon // neon-bindings installed as native-addon via npm
      | native
        | src
          | lib.rs // rust entrypoint
        build.rs // rust build script
        Cargo.toml // rust config
      | package.json
    | preload // preload
    | render // render process
      | index.tsx // render process entrypoint
      | App.tsx // App component
    | public // folder with html, images, etc.
      | index.html // entypoint for HtmlWebpackPlugin
  | .gitignore
  | audit-ci.json // config to audit dependencies
```

### Webpack

Webpack configuration using swc instead of babel to speed up build process.

```

```
