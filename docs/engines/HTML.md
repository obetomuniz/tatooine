# scrapeHtml

The `scrapeHtml` function takes an page URL and an object containing `selectors` as input and returns an object with data extracted from the HTML string. It uses the `jsdom` and `utils/http` functions to load the HTML and extract the required information using the provided `selectors`.

## Selectors

The `selectors` should be an object with keys that correspond to the data that you want to extract, and values that are the corresponding CSS selectors and HTML tag attributes.

## Request

The `request` configuration should be an object that correspond to the `AxiosRequestConfig` type from `axios`. Enjoy this flexibility.

## Example

```javascript
import { scrapeHtml } from "tatooine"

const htmlUrl = "https://example.com"
const htmlData = await scrapeHtml(htmlUrl, {
  selectors: {
    title: { selector: "title" },
    featured: { selector: "img", attribute: "src" },
  },
  request: {
    headers: {
      "Cache-Control": "no-cache",
    },
  },
})

// Output:
// {
//   title: 'My Title',
//   heading: 'Hello World!',
// }
```
