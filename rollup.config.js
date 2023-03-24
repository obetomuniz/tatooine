import resolve from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import typescript from "@rollup/plugin-typescript"
import dts from "rollup-plugin-dts"

// import filesize from "rollup-plugin-filesize"
// import packageJson from "./package.json" assert { type: "json" }

const config = [
  {
    input: "lib/index.ts",
    output: [
      {
        file: "./dist/esm/index.js",
        format: "esm",
        sourcemap: true,
      },
      {
        file: "./dist/cjs/index.js",
        format: "cjs",
        sourcemap: true,
      },
    ],
    plugins: [
      commonjs(),
      resolve(),
      typescript({
        tsconfig: "./tsconfig.json",
      }),
    ],
    external: ["axios", "jsdom", "xpath-ts", "puppeteer", "lodash.get"],
  },
  {
    input: "dist/esm/types/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    plugins: [dts()],
  },
]
export default config
