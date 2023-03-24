import { AxiosRequestConfig } from "axios"
import { JSDOM } from "jsdom"
import { TScrapedDataPromise, IScrapeXmlOptions } from "../../types"
import fetchHttp from "../../utils/request/http"
import extractData from "../../utils/extract/xml"

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
  { selectors, request }: IScrapeXmlOptions
): TScrapedDataPromise => {
  const xml = await fetchHttp(url, request as AxiosRequestConfig)
  const data = await processData(xml, { selectors })

  return data
}

export default scrapeXml
