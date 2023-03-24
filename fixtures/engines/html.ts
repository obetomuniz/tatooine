import { EngineType } from "../../lib/types"

const SpaScrapingFixture = {
  url: "https://davidwalsh.name/demo/lazyload-2.0.php",
  engine: EngineType.Html,
  options: {
    selectors: {
      title: {
        selector: ".demo-wrapper table tr .image img",
        attribute: "src",
      },
    },
    spa: {
      enable: true,
      browserConfig: {
        executablePath: "/opt/homebrew/bin/chromium",
      },
    },
  },
}

const HtmlScrapingFixture = {
  url: "https://github.com/trending/javascript",
  engine: EngineType.Html,
  options: {
    selectors: { title: { selector: "h1 a", attribute: "href" } },
  },
}

// TODO: Create Fixtures with Invalid Selectors

export { SpaScrapingFixture, HtmlScrapingFixture }
