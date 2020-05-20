import axios from "axios"
import {
  getJSONContentFromChain,
  getSourcesFromJSON,
  createResult,
} from "../helpers/index.js"

const getSourcesFromJSONObject = async ({
  options,
  selectors,
  metadata,
  fork,
}) => {
  try {
    const { root, ...rest } = selectors
    const {
      request: { url, headers = {} },
      limit,
    } = options
    const { data } = await axios({
      url,
      headers: {
        "user-agent": "node.js",
        ...headers,
      },
    })
    const list = root ? getJSONContentFromChain(root.value, data) : data
    const sources = getSourcesFromJSON(list, rest)

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
  engine: "json",
  run: getSourcesFromJSONObject,
}
