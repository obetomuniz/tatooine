import { scrapeJson } from "../../../index"
import { JsonScrapingFixture } from "../../../../fixtures"

describe("Tatooine", () => {
  describe("scrapeJson", () => {
    it("should process from JSON resource", async () => {
      const data = await scrapeJson(
        JsonScrapingFixture.url,
        JsonScrapingFixture.options
      )
      expect(data.title).toBeDefined()
    })
  })
})
