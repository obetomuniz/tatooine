// @ts-ignore
import { parse } from "../dist/bundle.esm"
import {
  SpaScrapingFixture,
  HtmlScrapingFixture,
  XmlScrapingFixture,
  JsonScrapingFixture,
} from "../fixtures"

describe("Tatooine", () => {
  describe("parse", () => {
    it("should process from HTML resource", async () => {
      const data = await parse(HtmlScrapingFixture)
      expect(data.title).toBeDefined()
    })
    it("should process from XML resource", async () => {
      const data = await parse(XmlScrapingFixture)
      expect(data.title).toBeDefined()
    })
    it("should process from JSON resource", async () => {
      const data = await parse(JsonScrapingFixture)
      expect(data.title).toBeDefined()
    })
    // TODO: Investigate why this test not is working, probably related to puppeteer support
    xit("should process from SPA resource", async () => {
      const data = await parse(SpaScrapingFixture)
      expect(data.title).toBeDefined()
    })
  })
})
