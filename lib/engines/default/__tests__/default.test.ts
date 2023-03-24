import { SpaScrapingFixture, HtmlScrapingFixture } from "../../html/fixtures"
import { JsonScrapingFixture } from "../../json/fixtures"
import { XmlScrapingFixture } from "../../xml/fixtures"
import { scrape } from "../../../index"

describe("Tatooine", () => {
  describe("scrape", () => {
    it("should process from HTML resource", async () => {
      const data = await scrape(HtmlScrapingFixture)
      expect(data.title).toBeDefined()
    })
    // TODO: Investigate why this test not is working, probably related to puppeteer support
    xit("should process from SPA resource", async () => {
      const data = await scrape(SpaScrapingFixture)
      expect(data.title).toBeDefined()
    })
    it("should process from XML resource", async () => {
      const data = await scrape(XmlScrapingFixture)
      expect(data.title).toBeDefined()
    })
    it("should process from JSON resource", async () => {
      const data = await scrape(JsonScrapingFixture)
      expect(data.title).toBeDefined()
    })
  })
})
