import Tatooine from "../src/index.js"
import schemas from "./fixtures"

describe("Tatooine", () => {
  it("should load given fixtures", async () => {
    const data = await Tatooine(schemas.valid)

    expect(data).toHaveLength(8)
    for (let index = 0; index < data.length; index++) {
      expect(data[index].metadata).toBeDefined()
      expect(data[index].sources).toBeDefined()
      expect(data[index].error).toBeUndefined()
    }
  }, 30000)

  it("should present error given invalid fixtures", async () => {
    const data = await Tatooine(schemas.invalid)

    expect(data).toHaveLength(3)
    for (let index = 0; index < data.length; index++) {
      expect(data[index].error).toBeDefined()
    }
  })
})
