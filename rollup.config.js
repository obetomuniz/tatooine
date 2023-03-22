import typescript from "rollup-plugin-typescript2"
import commonjs from "@rollup/plugin-commonjs"
import resolve from "@rollup/plugin-node-resolve"
import terser from "@rollup/plugin-terser"

export default {
  input: "lib/index.ts",
  output: [
    {
      file: "dist/bundle.cjs.js",
      format: "cjs",
      sourcemap: true,
      exports: "named",
    },
    {
      file: "dist/bundle.esm.js",
      sourcemap: true,
      format: "esm",
    },
  ],
  external: ["axios", "jsdom", "xpath", "puppeteer", "lodash.get"],
  plugins: [
    typescript({
      tsconfig: "./tsconfig.json",
    }),
    resolve(),
    commonjs(),
    terser(),
  ],
}
