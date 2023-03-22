import { JSDOM } from "jsdom"
import * as puppeteer from "puppeteer"
import {
  TParsedData,
  TParsedDataPromise,
  IParseHtmlOptions,
  TSelectors,
} from "types"
import fetchSpaData from "utils/fetchSpaData"
import fetchData from "utils/fetchData"

const extractData = (
  document: Document,
  selectors: TSelectors
): TParsedData => {
  const data: TParsedData = {}

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
  options: IParseHtmlOptions
): TParsedDataPromise => {
  const { selectors, spa } = options

  if (spa?.enable) {
    const htmlContent = await fetchSpaData(url, spa.browserConfig)
    const dom = new JSDOM(htmlContent)
    const document = dom.window.document
    return extractData(document, selectors)
  } else {
    const html = await fetchData(url)
    const dom = new JSDOM(html)
    const document = dom.window.document
    return extractData(document, selectors)
  }
}

const parse = async (
  url: string,
  { selectors, spa = { enable: false, browserConfig: {} } }: IParseHtmlOptions
): TParsedDataPromise => {
  const data = await processData(url, { selectors, spa })
  return data
}

export default parse
