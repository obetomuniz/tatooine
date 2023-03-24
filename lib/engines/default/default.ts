import { TScrapedDataPromise, IScrapeOptions } from "../../types"
import scrapeHtml from "../../engines/html/html"
import scrapeSpa from "../../engines/spa/spa"
import scrapeJson from "../../engines/json/json"
import scrapeXml from "../../engines/xml/xml"

const SCRAPE_TYPES = {
  html: scrapeHtml,
  spa: scrapeSpa,
  json: scrapeJson,
  xml: scrapeXml,
}

const scrape = async ({
  url,
  engine,
  options,
}: IScrapeOptions): TScrapedDataPromise => {
  return await SCRAPE_TYPES[engine](url, options)
}

export default scrape
