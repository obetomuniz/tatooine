# scrapeXml

The `scrapeXml` function takes an XML URL resource and an object containing `selectors` as input and returns an object with data extracted from the XML. It uses the `xmldom`, `xpath`, and `utils/fetchData` functions to make the HTTP request and scrape the XML using the provided `selectors`.

## Selectors

The `selectors` should be an object with keys that correspond to the data that you want to extract, and values that are the corresponding XPath expressions.

## Example

```javascript
import { scrapeXml } from "tatooine"

const xmlUrl = "https://example.com/feed.xml"
const xmlData = await scrapeXml(xmlUrl, {
  title: {
    selector: "//channel/title",
  },
  description: {
    selector: "//channel/description",
  },
})

// Output:
// {
//   title: 'My RSS Feed',
//   description: 'A sample RSS feed',
// }
```
