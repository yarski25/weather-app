import webpack, { Configuration } from "webpack";
import { BuildOptions } from "./types/types";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";
import path from "path";
const Dotenv = require("dotenv-webpack");

export function buildPlugins(options: BuildOptions): Configuration["plugins"] {
  const { mode, paths, analyzer, platform } = options;
  const isDev = mode === "development";
  const isProd = mode === "production";

  const plugins: Configuration["plugins"] = [
    new HtmlWebpackPlugin({
      template: paths.html,
      favicon: path.resolve(paths.public, "app.ico"),
      manifest: path.resolve(paths.public, "manifest.json"),
    }),
    new webpack.DefinePlugin({
      __PLATFORM__: JSON.stringify(platform),
    }),
  ];

  if (isDev) {
    plugins.push(new webpack.ProgressPlugin());
    plugins.push(
      new Dotenv({
        path: ".env.dev",
      })
    );
    plugins.push(
      new webpack.DefinePlugin({
        "process.env.NODE_ENV": JSON.stringify("development"),
      })
    );
    // type checking is moved to separate process
    plugins.push(new ForkTsCheckerWebpackPlugin());
    plugins.push(new ReactRefreshWebpackPlugin());
  }

  if (isProd) {
    plugins.push(
      new MiniCssExtractPlugin({
        // filename: "css/[name].[contenthash:8].css",
        // chunkFilename: "css/[name].[contenthash:8].css",
        filename: "static/css/[name].[contenthash:8].css",
        chunkFilename: "static/css/[name].[contenthash:8].chunk.css",
      })
    );
    // plugins.push(
    //   new Dotenv({
    //     path: ".env.prod",
    //   })
    // );
    plugins.push(
      new webpack.DefinePlugin({
        "process.env.NODE_ENV": JSON.stringify("production"),
        "process.env.REACT_APP_API_URL": JSON.stringify(
          process.env.REACT_APP_API_URL
        ),
        "process.env.REACT_APP_API_KEY": JSON.stringify(
          process.env.REACT_APP_API_KEY
        ),
      })
    );
    plugins.push(
      new CopyPlugin({
        patterns: [
          {
            from: path.resolve(paths.public, "locales"),
            to: path.resolve(paths.output, "locales"),
          },
          {
            from: path.resolve(paths.public, "logo192.png"),
            to: path.resolve(paths.output, "logo192.png"),
          },
          {
            from: path.resolve(paths.public, "logo512.png"),
            to: path.resolve(paths.output, "logo512.png"),
          },
          {
            from: path.resolve(paths.public, "manifest.json"),
            to: path.resolve(paths.output, "manifest.json"),
          },
        ],
      })
    );
  }

  if (analyzer) {
    plugins.push(new BundleAnalyzerPlugin());
  }

  return plugins;
}
