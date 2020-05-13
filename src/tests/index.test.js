import Tatooine from "../index.js"
import schemas from "../../devtools/jest/fixtures"

describe("Tatooine", () => {
  it("should load given fixtures", async () => {
    const data = await Tatooine(schemas.valid)

    expect(data).toHaveLength(6)
    for (let index = 0; index < data.length; index++) {
      expect(data[index].metadata).toBeDefined()
      expect(data[index].sources).toBeDefined()
      expect(data[index].error).toBeUndefined()
    }
  })

  it("should present error given invalid fixtures", async () => {
    const data = await Tatooine(schemas.invalid)

    expect(data).toHaveLength(2)
    for (let index = 0; index < data.length; index++) {
      expect(data[index].error).toBeDefined()
    }
  })
})
