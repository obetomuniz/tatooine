import { TScrapedData, TSelectors } from "../../types"

const extractData = (
  document: Document,
  selectors: TSelectors
): TScrapedData => {
  const data: TScrapedData = {}

  for (const [key, value] of Object.entries(selectors)) {
    const elements = document.querySelectorAll(value.selector)
    if (!elements.length) {
      data[key] = ""
    } else if (elements.length === 1) {
      if (value?.attribute) {
        data[key] = elements[0].getAttribute(value?.attribute) || ""
      } else {
        data[key] = elements[0].textContent?.trim() || ""
      }
    } else if (elements.length > 1) {
      const values = Array.from(elements, (element) => {
        if (value?.attribute) {
          return element.getAttribute(value?.attribute) || ""
        }
        return element.textContent?.trim() || ""
      })
      data[key] = values
    }
  }

  return data
}

export default extractData
