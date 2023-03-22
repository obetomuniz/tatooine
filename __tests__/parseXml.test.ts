// @ts-ignore
import { parseXml } from "../dist/bundle.esm"
import { XmlScrapingFixture } from "../fixtures"

describe("Tatooine", () => {
  describe("parseXml", () => {
    it("should process from XML resource", async () => {
      const data = await parseXml(
        XmlScrapingFixture.url,
        XmlScrapingFixture.options
      )
      expect(data.title).toBeDefined()
    })
  })
})
