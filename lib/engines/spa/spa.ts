import { LaunchOptions } from "puppeteer"
import { JSDOM } from "jsdom"
import { TScrapedDataPromise, IScrapeSpaOptions } from "../../types"
import fetchSpa from "../../utils/request/spa"
import extractData from "../../utils/extract/html"

const processData = async (
  url: string,
  options: IScrapeSpaOptions
): TScrapedDataPromise => {
  const { selectors, request, plugins } = options

  let html = await fetchSpa(url, request as LaunchOptions)

  plugins?.forEach((plugin) => {
    if (plugin.preProcess) {
      html = plugin.preProcess(html)
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
      plugin.pluginType === "transformer" &&
      plugin.initialize &&
      plugin?.supportedEngines?.includes("spa")
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

export default scrapeSpa
