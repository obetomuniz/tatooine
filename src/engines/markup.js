import axios from "axios"
import jsdom from "jsdom"

const inlineText = (text, parse) => {
  if (!parse) {
    return text
  }

  let inlineValue = text.replace(/\n|\r/g, "")

  return inlineValue.replace(/\s+/g, " ").trim()
}

const getSource = (node, selector) => {
  const { value, attribute, prefix = "", suffix = "", inline = true } = selector

  if (attribute) {
    return `${prefix}${inlineText(
      node.querySelector(value).getAttribute(attribute),
      inline
    )}${suffix}`
  }

  return `${prefix}${inlineText(
    node.querySelector(value).textContent,
    inline
  )}${suffix}`
}

const createResult = (result, fork) => {
  return fork ? fork(result) : result
}

const getSourcesFromMarkup = async ({
  requestOptions,
  selectors,
  limit,
  metadata,
  fork,
}) => {
  try {
    const { root, ...rest } = selectors
    const { data } = await axios(requestOptions)
    const dom = new jsdom.JSDOM(data, requestOptions)
    const doc = dom.window.document
    const nodeList = doc.querySelectorAll(root.value)
    let sources = []

    nodeList.forEach((node, order) => {
      let source = { order }
      for (const item in rest) {
        if (Object.prototype.hasOwnProperty.call(rest, item)) {
          const selector = rest[item]

          source[item] = getSource(node, selector)
        }
      }
      sources = [...sources, source]
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
  engine: "markup",
  run: getSourcesFromMarkup,
}
