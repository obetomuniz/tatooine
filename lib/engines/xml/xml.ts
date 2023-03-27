import { AxiosRequestConfig } from "axios"
import { JSDOM } from "jsdom"
import { TScrapedDataPromise, IScrapeXmlOptions } from "../../types"
import fetchHttp from "../../utils/request/http"
import extractData from "../../utils/extract/xml"

const processData = async (
  url: string,
  { selectors, request, plugins }: IScrapeXmlOptions
): TScrapedDataPromise => {
  let xml = await fetchHttp(url, request)

  plugins?.forEach((plugin) => {
    if (plugin.preProcess) {
      xml = plugin.preProcess(xml)
    }
  })

  const dom = new JSDOM(xml, { contentType: "text/xml" })
  const document = dom.window.document
  return extractData(document, selectors)
}

const scrapeXml = async (
  url: string,
  { selectors, request, plugins }: IScrapeXmlOptions
): TScrapedDataPromise => {
  plugins?.forEach((plugin) => {
    if (
      plugin.pluginType === "transformer" &&
      plugin.initialize &&
      plugin?.supportedEngines?.includes("xml")
    ) {
      plugin.initialize({ selectors })
    }
  })

  let data = await processData(url, { selectors, request, plugins })

  plugins?.forEach((plugin) => {
    if (plugin.postProcess) {
      data = plugin.postProcess(data)
    }
  })

  return data
}

export default scrapeXml
