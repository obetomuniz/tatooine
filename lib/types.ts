import { LaunchOptions } from "puppeteer"

export enum EngineType {
  Html = "html",
  Json = "json",
  Xml = "xml",
}

export type TParsedData = Record<string, any>

export type TParsedDataPromise = Promise<TParsedData>

export interface ISelectorWithAttribute {
  selector: string
  attribute?: string
}

export type TSelectors = Record<string, ISelectorWithAttribute>

export interface IParseDefaultOptions {
  selectors: TSelectors
}

export interface IParseHtmlOptions extends IParseDefaultOptions {
  spa?: { enable: boolean; browserConfig: LaunchOptions }
}

export interface IParseJsonOptions extends IParseDefaultOptions {}

export interface IParseXmlOptions extends IParseDefaultOptions {}

export interface IParseOptions {
  url: string
  engine: EngineType
  options: IParseHtmlOptions | IParseJsonOptions | IParseXmlOptions
}
