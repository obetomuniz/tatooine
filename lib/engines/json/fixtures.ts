import { EngineType } from "types"

const JsonScrapingFixture = {
  url: "https://my-json-server.typicode.com/typicode/demo/posts/1",
  engine: EngineType.Json,
  options: {
    selectors: { title: { selector: "title" } },
  },
}

// TODO: Create Fixtures with Invalid Selectors

export { JsonScrapingFixture }
