# parseApi

The `parseApi` function takes an JSON resource and an object containing `selectors` as input and returns an object with data extracted from the HTML. It uses the `utils/fetchData` to make the HTTP request to load the JSON data.

## Selectors

The `selectors` should be an object with keys that correspond to the data that you want to extract in the JSON returned.

## Example

```javascript
import { parseApi } from "tatooine"

const apiUrl = "https://example.com/api"
const result = await parseApi(apiUrl, {
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
