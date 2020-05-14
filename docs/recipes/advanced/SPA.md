# SPA Recipes

This recipe is demonstrating how to use Tatooine to crawling content from Single Page Applications.

## SPA with Infinite Scroll Loading

In this example, we will use a Puppeteer Helper to force scroll the page until the content finish to be loaded in order to fetch all the available resources defined in the `selectors` field of the schema.

```js
// index.js

import Tatooine from "tatooine"

const puppeteerAutoScrollHelper = async (page) => {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      const distance = 100
      let totalHeight = 0
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight
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

const spa = {
  engine: "markup",
  options: {
    request: {
      url: "https://davidwalsh.name/demo/lazyload-2.0.php",
      spa: {
        enable: true,
        onPageLoaded: async (page) => await puppeteerAutoScrollHelper(page),
      },
    },
  },
  selectors: {
    root: {
      value: ".demo-wrapper table tr",
    },
    src: {
      value: ".image img",
      attribute: "src",
      prefix: "https:",
    },
  },
  metadata: {
    name: "SPA Demo",
  },
}

Tatooine([spa]).then(...)
```
