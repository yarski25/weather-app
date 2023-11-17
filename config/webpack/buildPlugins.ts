import webpack, { Configuration } from "webpack";
import { BuildOptions } from "./types/types";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
const Dotenv = require("dotenv-webpack");

export function buildPlugins(options: BuildOptions): Configuration["plugins"] {
  const { mode, paths, analyzer } = options;
  const isDev = mode === "development";
  const isProd = mode === "production";

  const plugins: Configuration["plugins"] = [
    new HtmlWebpackPlugin({
      template: paths.html,
      favicon: paths.favicon,
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
  }

  if (isProd) {
    plugins.push(
      new MiniCssExtractPlugin({
        filename: "css/[name].[contenthash:8].css",
        chunkFilename: "css/[name].[contenthash:8].css",
        // filename: "static/js/[name].[contenthash:8].js",
        // chunkFilename: "static/js/[name].[contenthash:8].chunk.js",
      })
    );
    plugins.push(
      new Dotenv({
        path: ".env.prod",
      })
    );
    plugins.push(
      new webpack.DefinePlugin({
        "process.env.NODE_ENV": JSON.stringify("production"),
      })
    );
  }

  if (analyzer) {
    plugins.push(new BundleAnalyzerPlugin());
  }

  return plugins;
}
