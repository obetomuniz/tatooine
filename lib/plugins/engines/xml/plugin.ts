import { JSDOM } from "jsdom"
import {
  EngineType,
  IEnginePlugin,
  IScrapeXmlOptions,
  PluginType,
  TScrapedDataPromise,
} from "../../../types"
import fetchHttp from "../../../utils/request/http"
import extractData from "../../../utils/extract/html"

const processData = async (
  url: string,
  { selectors, request, plugins }: IScrapeXmlOptions
): TScrapedDataPromise => {
  let xml = await fetchHttp(url, request)

  plugins?.forEach((plugin) => {
    if (plugin.onPreProcess) {
      xml = plugin.onPreProcess(xml)
    }
  })

  const dom = new JSDOM(xml, { contentType: "text/xml" })
  const document = dom.window.document
  return extractData(document, selectors)
}

export const scrape = async (
  url: string,
  { selectors, request, plugins }: IScrapeXmlOptions
): TScrapedDataPromise => {
  plugins?.forEach((plugin) => {
    if (
      plugin.type === PluginType.Transformer &&
      plugin.onInit &&
      plugin?.supportedEngines?.includes(EngineType.Xml || "all")
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

const plugin: IEnginePlugin<"xml"> = {
  type: "engine",
  engine: "xml",
  scrape,
}

export default plugin
