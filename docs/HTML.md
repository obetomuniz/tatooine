# scrapeHtml

The `scrapeHtml` function takes an page URL and an object containing `selectors` as input and returns an object with data extracted from the HTML string. It uses the `cheerio` and `utils/fetchData` functions to load the HTML and extract the required information using the provided `selectors`.

## Selectors

The `selectors` should be an object with keys that correspond to the data that you want to extract, and values that are the corresponding CSS selectors and HTML tag attributes.

## SPAs

If the `spa` option is enabled, scrapeHtml will use `puppeteer` to load the HTML content dynamically by opening a headless browser and navigating to the URL specified in the data parameter. This is useful for extracting data from single-page applications (SPAs) that load content dynamically.

## Example

```javascript
import { scrapeHtml } from "tatooine"

const htmlUrl = "https://example.com"
const htmlData = await scrapeHtml(htmlUrl, {
  selectors: {
    title: { selector: "title" },
    featured: { selector: "img", attribute: "src" },
  },
  spa: {
    enable: true,
    browserConfig: {
      headless: true,
      args: ["--no-sandbox"],
      executablePath: "/opt/homebrew/bin/chromium",
    },
  },
})

// Output:
// {
//   title: 'My Title',
//   heading: 'Hello World!',
// }
```
