import { TParsedDataPromise, IParseOptions } from "types"
import parseHtml from "engines/html"
import parseJson from "engines/json"
import parseXml from "engines/xml"

const PARSE_TYPES = {
  html: parseHtml,
  json: parseJson,
  xml: parseXml,
}

const parse = async ({
  url,
  engine,
  options,
}: IParseOptions): TParsedDataPromise => {
  return await PARSE_TYPES[engine](url, options)
}

export default parse
