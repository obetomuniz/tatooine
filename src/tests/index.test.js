import Tatooine from "../index.js"
import defaultSchemas from "../../devtools/jest/fixtures"

describe("Tatooine", () => {
  it("should load given fixtures", async () => {
    const data = await Tatooine(defaultSchemas)

    expect(data).toHaveLength(6)
    for (let index = 0; index < data.length; index++) {
      expect(data[index].metadata).toBeDefined()
      expect(data[index].sources).toBeDefined()
    }
  })
})
