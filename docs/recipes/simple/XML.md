# RSS Recipes

This recipe is demonstrating how to use Tatooine to crawling content from XML

## Example 1

In this example, we are fetching the data from a given RSS source. Note the we are using the explicit `contentType` flag to enable the JSDOM XML parsing mode.

```js
// index.js

import Tatooine from "tatooine"

const rss = {
  engine: "markup",
  options: {
    request: {
      url: "https://www.smashingmagazine.com/feed",
    },
    dom: {
      contentType: "text/xml",
    },
  },
  selectors: {
    root: {
      value: "channel item",
    },
    title: {
      value: "title",
    },
    url: {
      value: "link",
    },
  },
  metadata: {
    name: "Smashing Magazine",
  },
}

Tatooine([rss]).then(...)
```
