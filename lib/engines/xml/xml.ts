import { JSDOM } from "jsdom"
import xpath, { XPathResult } from "xpath-ts"
import {
  TScrapedData,
  TScrapedDataPromise,
  IScrapeXmlOptions,
  TSelectors,
} from "../../types"
import fetchHttp from "../../utils/request/http"

const extractData = (
  document: Document,
  selectors: TSelectors
): TScrapedData => {
  const data: TScrapedData = {}

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
  { selectors }: IScrapeXmlOptions
): TScrapedDataPromise => {
  const dom = new JSDOM(xml, { contentType: "text/xml" })
  const document = dom.window.document
  return extractData(document, selectors)
}

const scrapeXml = async (
  url: string,
  { selectors }: IScrapeXmlOptions
): TScrapedDataPromise => {
  const xml = await fetchHttp(url)
  const data = await processData(xml, { selectors })

  return data
}

export default scrapeXml
