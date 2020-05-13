import jsdom from "jsdom"
import axios from "axios"
import puppeteer from "puppeteer"

const createRequest = async ({ spa = false, ...rest }) => {
  if (spa) {
    const { url } = rest
    const browser = await puppeteer.launch(rest)
    const page = await browser.newPage()
    await page.goto(url)
    const content = await page.content()

    await browser.close()

    return content
  }

  const { data } = await axios(rest)

  return data
}

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
    if (node.querySelector(value)) {
      return `${prefix}${inlineText(
        node.querySelector(value).getAttribute(attribute),
        inline
      )}${suffix}`
    } else {
      return null
    }
  }

  if (node.querySelector(value)) {
    return `${prefix}${inlineText(
      node.querySelector(value).textContent,
      inline
    )}${suffix}`
  }

  return null
}

const createResult = (result, fork) => {
  return fork ? fork(result) : result
}

const getSourcesFromMarkup = async ({ options, selectors, metadata, fork }) => {
  try {
    const { root, ...rest } = selectors
    const data = await createRequest(options.request)
    const dom = new jsdom.JSDOM(data, options.dom)
    const doc = dom.window.document
    const nodeList = doc.querySelectorAll(root.value)
    let sources = []

    nodeList.forEach((node, order) => {
      let source = { order }

      for (const item in rest) {
        if (Object.prototype.hasOwnProperty.call(rest, item)) {
          const selector = rest[item]
          const content = getSource(node, selector)

          if (content) {
            source[item] = content
          }
        }
      }
      sources = [...sources, source]
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
  engine: "markup",
  run: getSourcesFromMarkup,
}
