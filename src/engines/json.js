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
}) {
  try {
    const { data } = await axios(requestOptions)
    let sources = data.map((jsonObject, order) => {
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

    return result
  } catch (e) {
    throw new Error(e)
  }
}

export default {
  type: "json",
  runtime: getSourcesFromJSON,
}
