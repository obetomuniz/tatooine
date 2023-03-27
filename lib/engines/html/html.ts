import { AxiosRequestConfig } from "axios"
import { JSDOM } from "jsdom"
import { TScrapedDataPromise, IScrapeHtmlOptions } from "../../types"
import fetchHttp from "../../utils/request/http"
import extractData from "../../utils/extract/html"

const processData = async (
  url: string,
  options: IScrapeHtmlOptions
): TScrapedDataPromise => {
  const { selectors, request, plugins } = options

  let html = await fetchHttp(url, request as AxiosRequestConfig)

  plugins?.forEach((plugin) => {
    if (plugin.preProcess) {
      html = plugin.preProcess(html)
    }
  })

  const dom = new JSDOM(html)
  const document = dom.window.document
  return extractData(document, selectors)
}

const scrapeHtml = async (
  url: string,
  { selectors, request, plugins }: IScrapeHtmlOptions
): TScrapedDataPromise => {
  plugins?.forEach((plugin) => {
    if (
      plugin.pluginType === "transformer" &&
      plugin.initialize &&
      plugin.supportedEngines?.includes("html")
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

export default scrapeHtml
