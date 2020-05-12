import axios from "axios"

const getSource = (jsonObject, selector) => {
  const { value, prefix = "", suffix = "" } = selector
  return `${prefix}${jsonObject[value]}${suffix}`
}

const createResult = (result, fork) => {
  return fork ? fork(result) : result
}

const getSourcesFromJSON = async ({
  requestOptions,
  selectors,
  limit,
  metadata,
  fork,
}) => {
  try {
    const { data } = await axios(requestOptions)
    const root = selectors.root
      ? selectors.root.split(".").reduce((o, i) => o[i], data)
      : data
    let sources = root.map((jsonObject, order) => {
      let source = { order }
      for (const item in selectors) {
        if (Object.prototype.hasOwnProperty.call(selectors, item)) {
          const selector = selectors[item]

          source[item] = getSource(jsonObject, selector)
        }
      }

      return source
    })

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
  run: getSourcesFromJSON,
}
