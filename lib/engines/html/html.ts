import { JSDOM } from "jsdom"
import {
  TScrapedData,
  TScrapedDataPromise,
  IScrapeHtmlOptions,
  TSelectors,
} from "../../types"
import fetchHttp from "../../utils/request/http"
import fetchSpa from "../../utils/request/spa"

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

const processData = async (
  url: string,
  options: IScrapeHtmlOptions
): TScrapedDataPromise => {
  const { selectors, spa } = options

  if (spa?.enable) {
    const htmlContent = await fetchSpa(url, spa.browserConfig)
    const dom = new JSDOM(htmlContent)
    const document = dom.window.document
    return extractData(document, selectors)
  } else {
    const html = await fetchHttp(url)
    const dom = new JSDOM(html)
    const document = dom.window.document
    return extractData(document, selectors)
  }
}

const scrapeHtml = async (
  url: string,
  { selectors, spa = { enable: false, browserConfig: {} } }: IScrapeHtmlOptions
): TScrapedDataPromise => {
  const data = await processData(url, { selectors, spa })
  return data
}

export default scrapeHtml
