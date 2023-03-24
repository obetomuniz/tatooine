import { AxiosRequestConfig } from "axios"
import { LaunchOptions } from "puppeteer"

export enum EngineType {
  Html = "html",
  Spa = "spa",
  Json = "json",
  Xml = "xml",
}

export type EngineTypes = "html" | "spa" | "json" | "xml"

export enum OperationType {
  Difference = "difference",
  Equal = "equal",
  Contains = "contains",
  Regex = "regex",
}

export type OperationTypes = "difference" | "equal" | "contains" | "regex"

export type OperatorFn = (a: string, b: string, sensitive: boolean) => boolean

export type Operators = {
  [key: string]: OperatorFn
}

export type TScrapedData = Record<string, any>

export type TScrapedDataPromise = Promise<TScrapedData>

export interface Condition {
  value: string
  operation: EngineType | OperationTypes
  sensitive?: boolean
}
export interface ISelector {
  selector: string
  attribute?: string
  conditions?: Condition[]
}

export type TSelectors = Record<string, ISelector>

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
