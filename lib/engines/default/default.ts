import { TScrapedDataPromise, IScrapeOptions } from "../../types"
import scrapeHtml from "../../engines/html/html"
import scrapeJson from "../../engines/json/json"
import scrapeXml from "../../engines/xml/xml"

const SCRAPE_TYPES = {
  html: scrapeHtml,
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
