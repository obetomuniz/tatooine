import htmlEnginePlugin from "../plugins/engines/html/plugin"
import spaEnginePlugin from "../plugins/engines/spa/plugin"
import jsonEnginePlugin from "../plugins/engines/json/plugin"
import xmlEnginePlugin from "../plugins/engines/xml/plugin"
import {
  IEnginePlugin,
  EnginePlugins,
  TScrapeDefaultOptions,
  TScrapedDataPromise,
} from "../types"

export const SCRAPE_TYPES: Record<
  string,
  (url: string, options: TScrapeDefaultOptions) => TScrapedDataPromise
> = {
  html: htmlEnginePlugin.scrape,
  spa: spaEnginePlugin.scrape,
  json: jsonEnginePlugin.scrape,
  xml: xmlEnginePlugin.scrape,
}

export const registerEnginePlugin = (plugin: IEnginePlugin) => {
  SCRAPE_TYPES[plugin.engine] = plugin.scrape
}
