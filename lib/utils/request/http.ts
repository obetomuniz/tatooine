import axios, { AxiosResponse, AxiosRequestConfig } from "axios"
import { DEFAULT_HTTP_REQUESTS_OPTIONS } from "../../constants"

const request = async (
  url: string,
  request: AxiosRequestConfig = {}
): Promise<any> => {
  try {
    const response: AxiosResponse<any> = await axios.get(url, {
      ...DEFAULT_HTTP_REQUESTS_OPTIONS,
      ...request,
    })
    return response.data
  } catch (error: any) {
    throw new Error(`Error fetching data from ${url}: ${error.message}`)
  }
}

export default request
