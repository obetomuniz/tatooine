import puppeteer, { Page, LaunchOptions } from "puppeteer"

const autoScroll = async (page: Page) => {
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
          resolve(true)
        }
      }, 100)
    })
  })
}

const request = async (url: string, config: LaunchOptions = {}) => {
  const browser = await puppeteer.launch({
    executablePath: config?.executablePath
      ? config.executablePath
      : puppeteer.executablePath(),
    ...config,
  })
  const page = await browser.newPage()
  await page.goto(url)
  await autoScroll(page)
  const content = await page.content()
  await browser.close()
  return content
}

export default request
