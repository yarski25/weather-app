import path from "path";
import webpack from "webpack";
import type { Configuration as DevServerConfiguration } from "webpack-dev-server";
import { buildWebpack } from "./config/webpack/buildWebpack";
import { BuildMode, BuildPaths } from "./config/webpack/types/types";

interface EnvVariables {
  mode: BuildMode;
  port: number;
  analyzer?: boolean;
}

const WebpackConfig = (env: EnvVariables) => {
  const paths: BuildPaths = {
    entry: path.resolve(__dirname, "src", "index.tsx"),
    html: path.resolve(__dirname, "public", "index.html"),
    favicon: path.resolve(__dirname, "public", "app.ico"),
    output: path.resolve(__dirname, "build"),
    src: path.resolve(__dirname, "src"),
  };

  const config: webpack.Configuration = buildWebpack({
    port: env.port ?? 3000,
    mode: env.mode ?? "development",
    paths,
    analyzer: env.analyzer,
  });
  return config;
};

export default WebpackConfig;
