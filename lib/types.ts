import { AxiosRequestConfig } from "axios"
import { LaunchOptions } from "puppeteer"

export enum EngineType {
  Html = "html",
  Spa = "spa",
  Json = "json",
  Xml = "xml",
}

export type EngineTypes = "html" | "spa" | "json" | "xml"

export type TScrapedData = Record<string, any>

export type TScrapedDataPromise = Promise<TScrapedData>

export interface ISelector {
  selector: string
  attribute?: string
}

export type TSelectors = Record<string, ISelector>

export interface IScrapeHtmlOptions {
  selectors: TSelectors
  request?: AxiosRequestConfig
  plugins?: ITransformerPlugin[]
}

export interface IScrapeSpaOptions {
  selectors: TSelectors
  request?: LaunchOptions
  plugins?: ITransformerPlugin[]
}

export interface IScrapeJsonOptions {
  selectors: TSelectors
  request?: AxiosRequestConfig
  plugins?: ITransformerPlugin[]
}

export interface IScrapeXmlOptions {
  selectors: TSelectors
  request?: AxiosRequestConfig
  plugins?: ITransformerPlugin[]
}

export type IScrapeDefaultOptions = IScrapeHtmlOptions &
  IScrapeSpaOptions &
  IScrapeJsonOptions &
  IScrapeXmlOptions

export interface IScrapeOptions {
  url: string
  engine: EngineType | EngineTypes
  options: IScrapeDefaultOptions
}

export enum PluginType {
  Transformer = "transformer",
  Engine = "engine",
}

export type PluginTypes = "transformer" | "engine"

export interface IPlugin {
  pluginType: string
}
export interface ITransformerPlugin extends IPlugin {
  meta?: any
  supportedEngines?: string[]
  preProcess?: (html: string) => string
  postProcess?: (data: TScrapedData) => TScrapedData
  initialize?: (options: { selectors: TSelectors }) => void
}

export interface IEnginePlugin extends IPlugin {
  engine: string
  scrape: (url: string, options: IScrapeDefaultOptions) => Promise<TScrapedData>
}
