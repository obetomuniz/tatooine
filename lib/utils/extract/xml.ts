import xpath, { XPathResult } from "xpath-ts"
import { TScrapedData, TSelectors } from "../../types"

const getSelectorValue = (values: string[], selector: any): any => {
  return values.length === 1 ? values[0] : values
}

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

    data[key] = getSelectorValue(nodeValues, value)
  }

  return data
}

export default extractData
