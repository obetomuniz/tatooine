import get from "lodash.get"
import {
  TParsedData,
  TParsedDataPromise,
  IParseXmlOptions,
  TSelectors,
} from "types"
import fetchData from "utils/fetchData"

const extractData = (j: any, selectors: TSelectors): TParsedData => {
  const data: TParsedData = {}

  if (Array.isArray(j)) {
    return j.map((obj) => {
      const data: TParsedData = {}

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
  { selectors }: IParseXmlOptions
): TParsedData => {
  return extractData(j, selectors)
}

const parse = async (
  url: string,
  { selectors }: IParseXmlOptions
): TParsedDataPromise => {
  const j = await fetchData(url)
  const data = processData(j, { selectors })
  return data
}

export default parse
