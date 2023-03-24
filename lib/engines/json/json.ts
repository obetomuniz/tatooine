import { AxiosRequestConfig } from "axios"
import {
  TScrapedData,
  TScrapedDataPromise,
  IScrapeXmlOptions,
} from "../../types"
import fetchHttp from "../../utils/request/http"
import extractData from "../../utils/extract/json"

const processData = (
  j: string,
  { selectors }: IScrapeXmlOptions
): TScrapedData => {
  return extractData(j, selectors)
}

const scrapeJson = async (
  url: string,
  { selectors, request }: IScrapeXmlOptions
): TScrapedDataPromise => {
  const j = await fetchHttp(url, request as AxiosRequestConfig)
  return processData(j, { selectors })
}

export default scrapeJson
