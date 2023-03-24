import get from "lodash.get"
import { TScrapedData, TSelectors } from "../../types"

const extractData = (j: any, selectors: TSelectors): TScrapedData => {
  const data: TScrapedData = {}

  if (Array.isArray(j)) {
    return j.map((obj) => {
      const data: TScrapedData = {}

      for (const [key, value] of Object.entries(selectors)) {
        data[key] = get(obj, value.selector, "")
      }

      return data
    })
  }

  for (const [key, value] of Object.entries(selectors)) {
    data[key] = get(j, value.selector, "")
  }

  return data
}

export default extractData
