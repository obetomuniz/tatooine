import { TScrapedDataPromise, IScrapeOptions, TEngineTypes } from "../types"
import { SCRAPE_TYPES } from "./register"

const isEngineTypeRegistered = (engine: string): engine is TEngineTypes => {
  return engine in SCRAPE_TYPES
}

export const scrape = async ({
  url,
  engine,
  options,
}: IScrapeOptions): TScrapedDataPromise => {
  if (!isEngineTypeRegistered(engine)) {
    throw new Error(`Invalid engine type: ${engine}`)
  }

  return await SCRAPE_TYPES[engine as TEngineTypes](url, options)
}
