import { TScrapedData, TSelectors } from "../../types"
import { applyConditions } from "../tools/condition"

const getSelectorValue = (element: Element, selector: any): string | null => {
  const value = selector.attribute
    ? element.getAttribute(selector.attribute) || ""
    : element.textContent?.trim() || ""

  if (selector.conditions && !applyConditions(value, selector.conditions)) {
    return null
  }

  return value
}

const extractData = (
  document: Document,
  selectors: TSelectors
): TScrapedData => {
  const data: TScrapedData = {}

  for (const [key, selector] of Object.entries(selectors)) {
    const elements = document.querySelectorAll(selector.selector)

    if (!elements.length) {
      data[key] = ""
    } else if (elements.length === 1) {
      data[key] = getSelectorValue(elements[0], selector) || ""
    } else {
      data[key] = Array.from(elements)
        .map((element) => getSelectorValue(element, selector))
        .filter((value) => value !== null)
    }
  }

  return data
}

export default extractData
