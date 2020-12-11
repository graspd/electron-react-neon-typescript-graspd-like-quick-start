import path from "path";
import { Configuration } from "webpack";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import TerserPlugin from "terser-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ESLintPlugin from "eslint-webpack-plugin";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import CaseSensitivePathsPlugin from "case-sensitive-paths-webpack-plugin";

const setupConfig = (
  _env: unknown,
  { mode }: { mode: string },
): Configuration[] => {
  const config: Configuration[] = [
    {
      mode: mode === "development" ? mode : "production",
      entry: path.join(__dirname, "src", "main"),
      target: "electron-main",
      devtool: "source-map",
      module: {
        rules: [
          {
            test: /\.ts$/,
            include: path.join(__dirname, "src", "main"),
            exclude: /node_modules/,
            use: [
              {
                loader: "swc-loader",
                options: {
                  sync: true,
                  minify: mode !== "development",
                  jsc: {
                    loose: true,
                    externalHelpers: true,
                    parser: {
                      syntax: "typescript",
                      decorators: true,
                      dynamicImport: true,
                    },
                  },
                  module: {
                    strict: true,
                    strictMode: true,
                  },
                },
              },
            ],
          },
          {
            test: /\.node$/,
            loader: "node-loader",
          },
        ],
      },
      output: {
        path: path.join(__dirname, "dist", "main"),
        filename: "index.js",
      },
      resolve: {
        extensions: [".js", ".ts", ".json"],
      },
      plugins: [
        new CleanWebpackPlugin(),
        new ESLintPlugin({
          extensions: ["ts"],
          emitError: true,
          emitWarning: true,
          failOnError: true,
          failOnWarning: true,
        }),
        new BundleAnalyzerPlugin({
          analyzerMode: mode === "development" ? "static" : "disabled",
          openAnalyzer: false,
        }),
        new CaseSensitivePathsPlugin(),
      ],
    },
    {
      mode: mode === "development" ? mode : "production",
      entry: path.join(__dirname, "src", "renderer", "index.tsx"),
      target: "electron-renderer",
      optimization: {
        minimize: mode !== "development",
        minimizer: [new TerserPlugin()],
      },
      devtool: "source-map",
      module: {
        rules: [
          {
            test: /\.js$/,
            enforce: "pre",
            use: ["source-map-loader"],
          },
          {
            test: /\.(ts|tsx)$/,
            include: path.join(__dirname, "src", "renderer"),
            exclude: /node_modules/,
            use: [
              {
                loader: "swc-loader",
                options: {
                  sync: true,
                  minify: mode !== "development",
                  jsc: {
                    externalHelpers: true,
                    loose: true,
                    parser: {
                      syntax: "typescript",
                      tsx: true,
                      decorators: true,
                      dynamicImport: true,
                    },
                  },
                  module: {
                    strict: true,
                    strictMode: true,
                  },
                },
              },
            ],
          },
        ],
      },
      output: {
        path: path.join(__dirname, "dist", "renderer"),
        filename: "index.js",
      },
      resolve: {
        extensions: [".js", ".ts", ".tsx", ".jsx", ".json"],
      },
      plugins: [
        new HtmlWebpackPlugin({
          template: path.join(__dirname, "src", "public", "index.html"),
          filename: path.join(__dirname, "dist", "public", "index.html"),
          minify: mode !== "development",
        }),
        new CleanWebpackPlugin(),
        new ESLintPlugin({
          extensions: ["ts", "tsx"],
          emitError: true,
          emitWarning: true,
          failOnError: true,
          failOnWarning: true,
        }),
        new BundleAnalyzerPlugin({
          analyzerMode: mode === "development" ? "static" : "disabled",
          openAnalyzer: false,
        }),
        new CaseSensitivePathsPlugin(),
      ],
    },
    {
      mode: mode === "development" ? mode : "production",
      entry: path.join(__dirname, "src", "preload", "preload.ts"),
      target: "electron-preload",
      devtool: "source-map",
      module: {
        rules: [
          {
            test: /\.(ts|tsx)$/,
            include: path.join(__dirname, "src", "preload"),
            exclude: /node_modules/,
            use: [
              {
                loader: "swc-loader",
                options: {
                  sync: true,
                  minify: mode !== "development",
                  jsc: {
                    externalHelpers: true,
                    loose: true,
                    parser: {
                      syntax: "typescript",
                      decorators: true,
                      dynamicImport: true,
                    },
                  },
                  module: {
                    strict: true,
                    strictMode: true,
                  },
                },
              },
            ],
          },
        ],
      },
      output: {
        path: path.join(__dirname, "dist", "preload"),
        filename: "preload.js",
      },
      resolve: {
        extensions: [".js", ".ts", ".json"],
      },
      plugins: [
        new CleanWebpackPlugin(),
        new ESLintPlugin({
          extensions: ["ts"],
          emitError: true,
          emitWarning: true,
          failOnError: true,
          failOnWarning: true,
        }),
        new BundleAnalyzerPlugin({
          analyzerMode: mode === "development" ? "static" : "disabled",
          openAnalyzer: false,
        }),
        new CaseSensitivePathsPlugin(),
      ],
    },
  ];
  return config;
};

export default setupConfig;
