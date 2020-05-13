import axios from "axios"

const getDataFromChain = (selector, data) => {
  return selector
    .replace(/\[|\]\.?/g, ".")
    .split(".")
    .filter((s) => s)
    .reduce((acc, val) => acc && acc[val], data)
}

const getSource = (jsonObject, selector) => {
  const { value, prefix = "", suffix = "" } = selector
  const content = getDataFromChain(value, jsonObject)

  if (content) {
    return `${prefix}${content}${suffix}`
  }

  return null
}

const createResult = (result, fork) => {
  return fork ? fork(result) : result
}

const getSourcesFromJSON = async ({ options, selectors, metadata, fork }) => {
  try {
    const { root, ...rest } = selectors
    const { data } = await axios(options.request)
    const list = root ? getDataFromChain(root.value, data) : data
    const sources = list.map((jsonObject) => {
      let source = {}

      for (const item in rest) {
        if (Object.prototype.hasOwnProperty.call(rest, item)) {
          const selector = rest[item]
          const content = getSource(jsonObject, selector)
          if (content) {
            source[item] = content
          }
        }
      }

      return source
    })

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
  engine: "json",
  run: getSourcesFromJSON,
}
