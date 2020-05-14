# SPA Recipes

This recipe is demonstrating how to use Tatooine to crawling content from Single Page Applications.

## SPA with Infinite Scroll Loading

In this example, we will use a helper to force scroll the page until the content finish to be loaded in order to fetch all the available resources defined in the `selectors` field of the schema.

**Note:**

```js
// index.js

import Tatooine from "tatooine"

// Force scroll down the page until the content finish to be loaded
const autoScrollHelper = async (page) => {
  await page.evaluate(async () => { // More info about: https://pptr.dev/#?product=Puppeteer&show=api-pageevaluatepagefunction-args
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
  engine: "spa",
  options: {
    request: {
      url: "https://davidwalsh.name/demo/lazyload-2.0.php",
      events: {
        onPageLoad: async (page) => await autoScrollHelper(page),
      }
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
