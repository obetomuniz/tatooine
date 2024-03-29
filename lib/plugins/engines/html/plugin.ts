import { AxiosRequestConfig } from "axios"
import { JSDOM } from "jsdom"
import {
  EngineType,
  IEnginePlugin,
  IScrapeHtmlOptions,
  PluginType,
  TScrapedDataPromise,
} from "../../../types"
import fetchHttp from "../../../utils/request/http"
import extractData from "../../../utils/extract/html"

const processData = async (
  url: string,
  options: IScrapeHtmlOptions
): TScrapedDataPromise => {
  const { selectors, request, plugins } = options

  let html = await fetchHttp(url, request as AxiosRequestConfig)

  plugins?.forEach((plugin) => {
    if (plugin.onPreProcess) {
      html = plugin.onPreProcess(html)
    }
  })

  const dom = new JSDOM(html)
  const document = dom.window.document
  return extractData(document, selectors)
}

export const scrape = async (
  url: string,
  { selectors, request, plugins = [] }: IScrapeHtmlOptions
): TScrapedDataPromise => {
  plugins?.forEach((plugin) => {
    if (
      plugin.type === PluginType.Transformer &&
      plugin.onInit &&
      plugin.supportedEngines?.includes(EngineType.Html || "all")
    ) {
      plugin.onInit({ selectors })
    }
  })

  let data = await processData(url, { selectors, request, plugins })

  plugins?.forEach((plugin) => {
    if (plugin.onPostProcess) {
      data = plugin.onPostProcess(data)
    }
  })

  return data
}

const plugin: IEnginePlugin<"html"> = {
  type: "engine",
  engine: "html",
  scrape,
}

export default plugin
