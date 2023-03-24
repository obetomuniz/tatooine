import { EngineType } from "../../lib/types"

const HtmlScrapingFixture = {
  url: "https://github.com/trending/javascript",
  engine: EngineType.Html,
  options: {
    selectors: { title: { selector: "h1 a", attribute: "href" } },
  },
}

// TODO: Create Fixtures with Invalid Selectors

export { HtmlScrapingFixture }
