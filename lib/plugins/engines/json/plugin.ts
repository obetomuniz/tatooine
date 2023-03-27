import {
  EngineType,
  IEnginePlugin,
  IScrapeJsonOptions,
  PluginType,
  TScrapedDataPromise,
} from "../../../types"
import fetchHttp from "../../../utils/request/http"
import extractData from "../../../utils/extract/html"

const processData = async (
  url: string,
  { selectors, request, plugins }: IScrapeJsonOptions
): TScrapedDataPromise => {
  let j = await fetchHttp(url, request)

  plugins?.forEach((plugin) => {
    if (plugin.onPreProcess) {
      j = plugin.onPreProcess(j)
    }
  })

  return extractData(j, selectors)
}

export const scrape = async (
  url: string,
  { selectors, request, plugins }: IScrapeJsonOptions
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

const plugin: IEnginePlugin<"json"> = {
  type: "engine",
  engine: "json",
  scrape,
}

export default plugin
