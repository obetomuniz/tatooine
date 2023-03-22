import { JSDOM } from "jsdom"
import xpath, { XPathResult } from "xpath-ts"
import {
  TParsedData,
  TParsedDataPromise,
  IParseXmlOptions,
  TSelectors,
} from "types"
import fetchData from "utils/fetchData"

const extractData = (
  document: Document,
  selectors: TSelectors
): TParsedData => {
  const data: TParsedData = {}

  for (const [key, value] of Object.entries(selectors)) {
    const nodes: XPathResult = xpath.evaluate(
      value.selector,
      document,
      null,
      XPathResult.ANY_TYPE,
      null
    )
    const nodeValues: string[] = []
    let node = nodes.iterateNext()
    while (node) {
      nodeValues.push(node.textContent || "")
      node = nodes.iterateNext()
    }
    data[key] = nodeValues.length === 1 ? nodeValues[0] : nodeValues
  }

  return data
}

const processData = async (
  xml: string,
  { selectors }: IParseXmlOptions
): TParsedDataPromise => {
  const dom = new JSDOM(xml, { contentType: "text/xml" })
  const document = dom.window.document
  return extractData(document, selectors)
}

const parse = async (
  url: string,
  { selectors }: IParseXmlOptions
): TParsedDataPromise => {
  const xml = await fetchData(url)
  const data = await processData(xml, { selectors })

  return data
}

export default parse
