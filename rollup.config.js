export default [
  {
    input: "src/index.js",
    output: {
      file: "lib/index.js",
      format: "cjs",
      sourcemap: true,
    },
    external: ["axios", "jsdom", "puppeteer"],
  },
  {
    input: "src/index.js",
    output: {
      file: "lib/index.esm.js",
      format: "esm",
      sourcemap: true,
    },
    external: ["axios", "jsdom", "puppeteer"],
  },
]
