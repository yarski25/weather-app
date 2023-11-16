export interface BuildPaths {
  entry: string;
  html: string;
  favicon: string;
  output: string;
  src: string;
}

export type BuildMode = "production" | "development" | "none" | undefined;

export interface BuildOptions {
  port: number;
  paths: BuildPaths;
  mode: BuildMode;
  analyzer?: boolean;
}
