import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import { pluginSass } from "@rsbuild/plugin-sass";
import { pluginSvgr } from "@rsbuild/plugin-svgr";
import { pluginTypeCheck } from "@rsbuild/plugin-type-check";

export default defineConfig({
  html: {
    template: "./public/index.html"
  },
  plugins: [pluginReact(), pluginTypeCheck(), pluginSass({}), pluginSvgr({ mixedImport: true })]
});
