import get from "lodash.get"
import { TScrapedData, TSelectors } from "../../types"
import { applyConditions } from "../tools/condition"

const getSelectorValue = (value: any, selector: any): any => {
  if (typeof value !== "string") {
    value = JSON.stringify(value)
  }

  if (selector.conditions && !applyConditions(value, selector.conditions)) {
    return null
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
