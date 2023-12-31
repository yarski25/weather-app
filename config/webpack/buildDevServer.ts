import type { Configuration as DevServerConfiguration } from "webpack-dev-server";
import { BuildOptions } from "./types/types";
import path from "path";

export function buildDevServer(options: BuildOptions) {
  return {
    port: options.port ?? 3000,
    open: true,
    // if share static using nginx should use proxy to index.html
    historyApiFallback: true,
    //contentBase: path.join(__dirname, "build"),
    hot: true,
  };
}
