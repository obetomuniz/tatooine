import { LaunchOptions } from "puppeteer"
import { JSDOM } from "jsdom"
import {
  TScrapedDataPromise,
  IScrapeSpaOptions,
  EngineType,
  PluginType,
} from "../../types"
import fetchSpa from "../../utils/request/spa"
import extractData from "../../utils/extract/html"

const processData = async (
  url: string,
  options: IScrapeSpaOptions
): TScrapedDataPromise => {
  const { selectors, request, plugins } = options

  let html = await fetchSpa(url, request as LaunchOptions)

  plugins?.forEach((plugin) => {
    if (plugin.onPreProcess) {
      html = plugin.onPreProcess(html)
    }
  })

  const dom = new JSDOM(html)
  const document = dom.window.document
  return extractData(document, selectors)
}

const scrapeSpa = async (
  url: string,
  { selectors, request, plugins }: IScrapeSpaOptions
): TScrapedDataPromise => {
  plugins?.forEach((plugin) => {
    if (
      plugin.type === PluginType.Transformer &&
      plugin.onInit &&
      plugin?.supportedEngines?.includes(EngineType.Spa || "all")
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

export default scrapeSpa
