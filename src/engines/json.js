import axios from "axios"

function getSource(jsonObject, selector) {
  const { value, prefix = "", suffix = "" } = selector
  return `${prefix}${jsonObject[value]}${suffix}`
}

async function getSourcesFromJSON({
  requestOptions,
  selectors,
  limit,
  metadata,
  fork,
}) {
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

    const result = {
      sources: sources.slice(0, limit),
      metadata,
    }

    return fork ? fork(result) : result
  } catch ({ message }) {
    const result = {
      sources: [],
      metadata,
      error: message,
    }

    return fork ? fork(result) : result
  }
}

export default {
  engine: "json",
  run: getSourcesFromJSON,
}
