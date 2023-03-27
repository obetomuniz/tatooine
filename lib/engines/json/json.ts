import { AxiosRequestConfig } from "axios"
import {
  TScrapedData,
  TScrapedDataPromise,
  IScrapeXmlOptions,
} from "../../types"
import fetchHttp from "../../utils/request/http"
import extractData from "../../utils/extract/json"

const processData = async (
  url: string,
  { selectors, request, plugins }: IScrapeXmlOptions
): TScrapedDataPromise => {
  let j = await fetchHttp(url, request)

  plugins?.forEach((plugin) => {
    if (plugin.preProcess) {
      j = plugin.preProcess(j)
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
      plugin.pluginType === "transformer" &&
      plugin.initialize &&
      plugin?.supportedEngines?.includes("json")
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

export default scrapeJson
