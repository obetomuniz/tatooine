import axios from "axios"
import {
  getNodeListFromSelector,
  getSourcesFromNodeList,
  createResult,
} from "../helpers/index.js"

const getSourcesFromMarkup = async ({ options, selectors, metadata, fork }) => {
  try {
    const { root, ...rest } = selectors
    const {
      request: { url, headers },
      xml = false,
      limit,
    } = options
    const { data } = await axios({ url, headers })
    const nodeList = getNodeListFromSelector(data, root, {
      contentType: xml ? "text/xml" : "text/html",
    })
    const sources = getSourcesFromNodeList(nodeList, rest)

    return createResult(
      {
        sources: sources.slice(0, limit),
        metadata,
      },
      fork
    )
  } catch ({ message }) {
    return createResult(
      {
        sources: [],
        metadata,
        error: message,
      },
      fork
    )
  }
}

export default {
  engine: "markup",
  run: getSourcesFromMarkup,
}
