import get from "lodash.get"
import {
  TScrapedData,
  TScrapedDataPromise,
  IScrapeXmlOptions,
  TSelectors,
} from "../../types"
import fetchHttp from "../../utils/request/http"

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

const processData = (
  j: string,
  { selectors }: IScrapeXmlOptions
): TScrapedData => {
  return extractData(j, selectors)
}

const scrapeJson = async (
  url: string,
  { selectors }: IScrapeXmlOptions
): TScrapedDataPromise => {
  const j = await fetchHttp(url)
  return processData(j, { selectors })
}

export default scrapeJson
