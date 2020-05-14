import axios from "axios"
import {
  getNodeListFromSelector,
  getSourcesFromNodeList,
  createResult,
} from "../helpers/index.js"

const getSourcesFromMarkup = async ({ options, selectors, metadata, fork }) => {
  try {
    const { root, ...rest } = selectors
    const { data } = await axios(options.request)
    const nodeList = getNodeListFromSelector(data, root, options.dom)
    const sources = getSourcesFromNodeList(nodeList, rest)

    return createResult(
      {
        sources: sources.slice(0, options.limit),
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
