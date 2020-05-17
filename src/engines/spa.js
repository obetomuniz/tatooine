import puppeteer from "puppeteer"
import {
  getNodeListFromSelector,
  getSourcesFromNodeList,
  createResult,
} from "../helpers/index.js"

// Force scroll down the page until the content finish to be loaded
const autoScroll = async (page) => {
  /* istanbul ignore next */ // TODO: Improve this test
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0
      let distance = 100
      let timer = setInterval(() => {
        let scrollHeight = document.body.scrollHeight
        window.scrollBy(0, distance)
        totalHeight += distance
        if (totalHeight >= scrollHeight) {
          clearInterval(timer)
          resolve()
        }
      }, 100)
    })
  })
}

const createRequest = async ({ url }) => {
  const browser = await puppeteer.launch()

  const page = await browser.newPage()

  await page.goto(url)

  await autoScroll(page)

  const content = await page.content()

  await browser.close()

  return content
}

const getSourcesFromSPA = async ({ options, selectors, metadata, fork }) => {
  try {
    const { root, ...rest } = selectors
    const data = await createRequest(options.request)
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
  engine: "spa",
  run: getSourcesFromSPA,
}
