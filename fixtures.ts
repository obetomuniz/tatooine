import { EngineType } from "./lib/types"

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

const XmlScrapingFixture = {
  url: "https://dev.to/feed/obetomuniz",
  engine: EngineType.Xml,
  options: {
    selectors: { title: { selector: "//item[1]/title/text()" } },
  },
}

const JsonScrapingFixture = {
  url: "https://my-json-server.typicode.com/typicode/demo/posts/1",
  engine: EngineType.Json,
  options: {
    selectors: { title: { selector: "title" } },
  },
}

// TODO: Create Fixtures with Invalid Selectors

export {
  SpaScrapingFixture,
  HtmlScrapingFixture,
  XmlScrapingFixture,
  JsonScrapingFixture,
}
