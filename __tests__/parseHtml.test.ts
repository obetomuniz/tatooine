// @ts-ignore
import { parseHtml } from "../dist/bundle.esm"
import { SpaScrapingFixture, HtmlScrapingFixture } from "../fixtures"

describe("Tatooine", () => {
  describe("parseHtml", () => {
    it("should process from HTML resource", async () => {
      const data = await parseHtml(
        HtmlScrapingFixture.url,
        HtmlScrapingFixture.options
      )
      expect(data.title).toBeDefined()
    })
    // TODO: Investigate why this test not is working, probably related to puppeteer support
    xit("should process from SPA resource", async () => {
      const data = await parseHtml(
        SpaScrapingFixture.url,
        SpaScrapingFixture.options
      )
      expect(data.title).toBeDefined()
    })
  })
})
