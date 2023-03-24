import { LaunchOptions } from "puppeteer"
import { JSDOM } from "jsdom"
import { TScrapedDataPromise, IScrapeSpaOptions } from "../../types"
import fetchSpa from "../../utils/request/spa"
import extractData from "../../utils/extract/html"

const processData = async (
  url: string,
  options: IScrapeSpaOptions
): TScrapedDataPromise => {
  const { selectors, request } = options

  const htmlContent = await fetchSpa(url, request as LaunchOptions)
  const dom = new JSDOM(htmlContent)
  const document = dom.window.document
  return extractData(document, selectors)
}

const scrapeSpa = async (
  url: string,
  { selectors, request }: IScrapeSpaOptions
): TScrapedDataPromise => {
  const data = await processData(url, { selectors, request })
  return data
}

export default scrapeSpa
