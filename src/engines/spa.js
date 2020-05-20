import {
  getNodeListFromSelector,
  getSourcesFromNodeList,
  createResult,
  createSPARequest,
} from "../helpers/index.js"

const getSourcesFromSPA = async ({ options, selectors, metadata, fork }) => {
  try {
    const { root, ...rest } = selectors
    const {
      request: { url },
      limit,
    } = options
    const data = await createSPARequest(url)
    const nodeList = getNodeListFromSelector(data, root)
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
  engine: "spa",
  run: getSourcesFromSPA,
}
