# RSS Recipes

This recipe is demonstrating how to use Tatooine to crawling content from a XML source

## Newsfeed RSS

In this example, we are fetching the data from a given RSS source.

```js
// index.js

import Tatooine from "tatooine"

const rss = {
  engine: "markup",
  options: {
    url: "https://www.smashingmagazine.com/feed",
    xml: true,
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
