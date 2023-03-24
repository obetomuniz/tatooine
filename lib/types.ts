import { AxiosRequestConfig } from "axios"
import { LaunchOptions } from "puppeteer"

export type EngineTypes = "html" | "spa" | "json" | "xml"

export enum EngineType {
  Html = "html",
  Spa = "spa",
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

export interface IScrapeHtmlOptions {
  selectors: TSelectors
  request?: AxiosRequestConfig
}

export interface IScrapeSpaOptions {
  selectors: TSelectors
  request?: LaunchOptions
}

export interface IScrapeJsonOptions {
  selectors: TSelectors
  request?: AxiosRequestConfig
}

export interface IScrapeXmlOptions {
  selectors: TSelectors
  request?: AxiosRequestConfig
}

export interface IScrapeOptions {
  url: string
  engine: EngineType | EngineTypes
  options: IScrapeHtmlOptions &
    IScrapeSpaOptions &
    IScrapeJsonOptions &
    IScrapeXmlOptions
}
