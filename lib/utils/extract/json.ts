import get from "lodash.get"
import { TScrapedData, TSelectors } from "../../types"

const getSelectorValue = (value: any, selector: any): any => {
  if (typeof value !== "string") {
    value = JSON.stringify(value)
  }

  return value
}

const extractData = (j: any, selectors: TSelectors): TScrapedData => {
  const data: TScrapedData = {}

  if (Array.isArray(j)) {
    return j
      .map((obj) => {
        const data: TScrapedData = {}

        for (const [key, selector] of Object.entries(selectors)) {
          const value = get(obj, selector.selector, "")
          data[key] = getSelectorValue(value, selector)
        }

        return data
      })
      .filter((item) => Object.values(item).some((value) => value !== null))
  }

  for (const [key, selector] of Object.entries(selectors)) {
    const value = get(j, selector.selector, "")
    data[key] = getSelectorValue(value, selector)
  }

  return data
}

export default extractData
