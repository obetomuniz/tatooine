import { AxiosRequestConfig } from "axios"
import {
  TScrapedData,
  TScrapedDataPromise,
  IScrapeXmlOptions,
  EngineType,
  PluginType,
} from "../../types"
import fetchHttp from "../../utils/request/http"
import extractData from "../../utils/extract/json"

const processData = async (
  url: string,
  { selectors, request, plugins }: IScrapeXmlOptions
): TScrapedDataPromise => {
  let j = await fetchHttp(url, request)

  plugins?.forEach((plugin) => {
    if (plugin.onPreProcess) {
      j = plugin.onPreProcess(j)
    }
  })

  return extractData(j, selectors)
}

const scrapeJson = async (
  url: string,
  { selectors, request, plugins }: IScrapeXmlOptions
): TScrapedDataPromise => {
  plugins?.forEach((plugin) => {
    if (
      plugin.type === PluginType.Transformer &&
      plugin.onInit &&
      plugin?.supportedEngines?.includes(EngineType.Json || "all")
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

export default scrapeJson
