import puppeteer from "puppeteer"

/**
 * This auto scroll pages. It's really useful for any case, but mainly for lazy load pages.
 *
 * @param {PuppeteerPageClass} page https://github.com/puppeteer/puppeteer/blob/master/docs/api.md#class-pages
 */
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

/**
 * @param {string} url
 * @return {string} Return HTML content string
 */
export default async (url) => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(url)
  await autoScroll(page)
  const content = await page.content()
  await browser.close()
  return content
}
