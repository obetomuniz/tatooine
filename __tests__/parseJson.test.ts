// @ts-ignore
import { parseJson } from "../dist/bundle.esm"
import { JsonScrapingFixture } from "../fixtures"

describe("Tatooine", () => {
  describe("parseJson", () => {
    it("should process from JSON resource", async () => {
      const data = await parseJson(
        JsonScrapingFixture.url,
        JsonScrapingFixture.options
      )
      expect(data.title).toBeDefined()
    })
  })
})
