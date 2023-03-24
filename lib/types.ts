import { LaunchOptions } from "puppeteer"

export enum EngineType {
  Html = "html",
  Json = "json",
  Xml = "xml",
}

export type TScrapedData = Record<string, any>

export type TScrapedDataPromise = Promise<TScrapedData>

export interface ISelectorWithAttribute {
  selector: string
  attribute?: string
}

export type TSelectors = Record<string, ISelectorWithAttribute>

export interface IScrapeDefaultOptions {
  selectors: TSelectors
}

export interface IScrapeHtmlOptions extends IScrapeDefaultOptions {
  spa?: { enable: boolean; browserConfig: LaunchOptions }
}

export interface IScrapeJsonOptions extends IScrapeDefaultOptions {}

export interface IScrapeXmlOptions extends IScrapeDefaultOptions {}

export interface IScrapeOptions {
  url: string
  engine: EngineType
  options: IScrapeHtmlOptions | IScrapeJsonOptions | IScrapeXmlOptions
}
