import axios from "axios"

const getSource = (jsonObject, selector) => {
  const { value, prefix = "", suffix = "" } = selector

  if (jsonObject[value]) {
    return `${prefix}${jsonObject[value]}${suffix}`
  }

  return null
}

const createResult = (result, fork) => {
  return fork ? fork(result) : result
}

const getSourcesFromJSON = async ({ options, selectors, metadata, fork }) => {
  try {
    const { data } = await axios(options.request)
    const root = selectors.root
      ? selectors.root.split(".").reduce((o, i) => o[i], data)
      : data
    const sources = root.map((jsonObject, order) => {
      let source = { order }

      for (const item in selectors) {
        if (Object.prototype.hasOwnProperty.call(selectors, item)) {
          const selector = selectors[item]
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
