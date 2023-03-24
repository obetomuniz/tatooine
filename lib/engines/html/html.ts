import { AxiosRequestConfig } from "axios"
import { JSDOM } from "jsdom"
import { TScrapedDataPromise, IScrapeHtmlOptions } from "../../types"
import fetchHttp from "../../utils/request/http"
import extractData from "../../utils/extract/html"

const processData = async (
  url: string,
  options: IScrapeHtmlOptions
): TScrapedDataPromise => {
  const { selectors, request } = options

  const html = await fetchHttp(url, request as AxiosRequestConfig)
  const dom = new JSDOM(html)
  const document = dom.window.document
  return extractData(document, selectors)
}

const scrapeHtml = async (
  url: string,
  { selectors, request }: IScrapeHtmlOptions
): TScrapedDataPromise => {
  const data = await processData(url, { selectors, request })
  return data
}

export default scrapeHtml
