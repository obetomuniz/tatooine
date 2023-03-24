import { scrapeHtml } from "../../../index"
import { SpaScrapingFixture, HtmlScrapingFixture } from "../../../../fixtures"

describe("Tatooine", () => {
  describe("scrapeHtml", () => {
    it("should process from HTML resource", async () => {
      const data = await scrapeHtml(
        HtmlScrapingFixture.url,
        HtmlScrapingFixture.options
      )
      expect(data.title).toBeDefined()
    })
    // TODO: Investigate why this test not is working, probably related to puppeteer support
    xit("should process from SPA resource", async () => {
      const data = await scrapeHtml(
        SpaScrapingFixture.url,
        SpaScrapingFixture.options
      )
      expect(data.title).toBeDefined()
    })
  })
})
