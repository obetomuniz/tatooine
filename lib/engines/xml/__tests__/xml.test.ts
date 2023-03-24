import { scrapeXml } from "../../../index"
import { XmlScrapingFixture } from "../../../../fixtures"

describe("Tatooine", () => {
  describe("scrapeXml", () => {
    it("should process from XML resource", async () => {
      const data = await scrapeXml(
        XmlScrapingFixture.url,
        XmlScrapingFixture.options
      )
      expect(data.title).toBeDefined()
    })
  })
})
