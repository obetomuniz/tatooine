import axios, { AxiosResponse } from "axios"

const request = async (url: string): Promise<any> => {
  try {
    const response: AxiosResponse<any> = await axios.get(url)
    return response.data
  } catch (error: any) {
    throw new Error(`Error fetching data from ${url}: ${error.message}`)
  }
}

export default request
