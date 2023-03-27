# scrapeApi

The `scrapeApi` function takes an JSON resource and an object containing `selectors` as input and returns an object with data extracted.

## Selectors

The `selectors` should be an object with keys that correspond to the data that you want to extract in the JSON returned.

## Request

The `request` configuration should be an object that correspond to the `AxiosRequestConfig` type from `axios`. Enjoy this flexibility.

## Example

```javascript
import { scrapeApi } from "tatooine"

const apiUrl = "https://example.com/api"
const result = await scrapeApi(apiUrl, {
  selectors: {
    title: {
      selector: "title",
    },
    description: {
      selector: "description",
    },
    author: {
      selector: "author",
    },
  },
})

// Output:
// {
//   title: 'My JSON Data',
//   description: 'A sample JSON Data',
//   author: 'Beto Muniz'
// }
```
