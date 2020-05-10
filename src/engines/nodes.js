import axios from "axios"
import jsdom from "jsdom"

function inlineText(text, parse) {
  if (!parse) {
    return text
  }

  let inlineValue = text.replace(/\n|\r/g, "")

  return inlineValue.replace(/\s+/g, " ").trim()
}

function getSource(node, selector) {
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

async function getSourcesFromNodes({
  requestOptions,
  selectors,
  limit,
  metadata,
}) {
  const { root, ...rest } = selectors
  try {
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
  engine: "nodes",
  process: getSourcesFromNodes,
}
