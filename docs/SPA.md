# scrapeSpa

The `scrapeSpa` function takes an page URL and an object containing `selectors` as input and returns an object with data extracted from the HTML string. It uses the `puppeteer` and `utils/spa` to load the HTML and extract the required information from single-page applications (SPAs) that load content dynamically.

## Selectors

The `selectors` should be an object with keys that correspond to the data that you want to extract, and values that are the corresponding CSS selectors and HTML tag attributes.

## Request

The `request` configuration should be an object that correspond to the `LaunchOptions` type from `puppeeter`. Enjoy this flexibility.

## Example

```javascript
import { scrapeSpa } from "tatooine"

const htmlUrl = "https://example.com"
const htmlData = await scrapeSpa(htmlUrl, {
  selectors: {
    title: { selector: "title" },
    featured: { selector: "img", attribute: "src" },
  },
  request: {
    headless: true,
    args: ["--no-sandbox"],
    executablePath: "/opt/homebrew/bin/chromium",
  },
})

// Output:
// {
//   title: 'My Title',
//   heading: 'Hello World!',
// }
```
