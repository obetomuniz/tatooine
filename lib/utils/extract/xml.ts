import xpath, { XPathResult } from "xpath-ts"
import { TScrapedData, TSelectors } from "../../types"

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

export default extractData
