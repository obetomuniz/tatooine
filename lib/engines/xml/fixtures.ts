import { EngineType } from "types"

const XmlScrapingFixture = {
  url: "https://dev.to/feed/obetomuniz",
  engine: EngineType.Xml,
  options: {
    selectors: { title: { selector: "//item[1]/title/text()" } },
  },
}

// TODO: Create Fixtures with Invalid Selectors

export { XmlScrapingFixture }
