import puppeteer from "puppeteer"
import {
  getNodeListFromSelector,
  getSourcesFromNodeList,
  createResult,
} from "../helpers/index.js"

const createRequest = async ({ url, events = {}, ...rest }) => {
  const browser = await puppeteer.launch(rest)
  const { onBrowserLoad, willPageLoad, onPageLoad, onContentLoad } = events

  if (onBrowserLoad) {
    await onBrowserLoad(browser)
  }

  const page = await browser.newPage()

  if (willPageLoad) {
    await willPageLoad(page)
  }

  await page.goto(url)

  if (onPageLoad) {
    await onPageLoad(page)
  }

  const content = await page.content()

  if (onContentLoad) {
    await onContentLoad(content, page)
  }

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
