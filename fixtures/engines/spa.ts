import { EngineType } from "../../lib/types"

const SpaScrapingFixture = {
  url: "https://davidwalsh.name/demo/lazyload-2.0.php",
  engine: EngineType.Spa,
  options: {
    selectors: {
      title: {
        selector: ".demo-wrapper table tr .image img",
        attribute: "src",
      },
    },
    request: {
      executablePath: "/opt/homebrew/bin/chromium",
    },
  },
}

// TODO: Create Fixtures with Invalid Selectors

export { SpaScrapingFixture }
