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
    const result = createResult(
      {
        sources: sources.slice(0, limit),
        metadata,
      },
      fork
    )

    return result
  } catch ({ message }) {
    const result = await createResult(
      {
        sources: [],
        metadata,
        error: message,
      },
      fork
    )
    return result
  }
}

export default {
  engine: "markup",
  run: getSourcesFromMarkup,
}
