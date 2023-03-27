import { AxiosRequestConfig } from "axios"
import { LaunchOptions } from "puppeteer"

export enum EngineType {
  Html = "html",
  Spa = "spa",
  Json = "json",
  Xml = "xml",
}

export type TEngineTypes = "html" | "spa" | "json" | "xml"

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

export type TScrapeDefaultOptions = IScrapeHtmlOptions &
  IScrapeSpaOptions &
  IScrapeJsonOptions &
  IScrapeXmlOptions

export interface IScrapeOptions {
  url: string
  engine: EngineType | TEngineTypes
  options: TScrapeDefaultOptions
}

export enum PluginType {
  Transformer = "transformer",
  Engine = "engine",
}

export type PluginTypes = "transformer" | "engine"

export interface IPlugin {
  type: string
}

export type TPluginEngine = string

export type TPluginSupportedEngines =
  | EngineType
  | TEngineTypes
  | TPluginEngine
  | "all"
export interface ITransformerPlugin extends IPlugin {
  supportedEngines?: TPluginSupportedEngines[]
  onInit?: (options: { selectors: TSelectors }) => void
  onPreProcess?: (data: string) => string
  onPostProcess?: (data: TScrapedData) => TScrapedData
}

export interface IEnginePlugin extends IPlugin {
  engine: TPluginEngine
  scrape: (url: string, options: TScrapeDefaultOptions) => Promise<TScrapedData>
}
