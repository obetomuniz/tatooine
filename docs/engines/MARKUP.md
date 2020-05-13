# Markup Engine

```js
const api = {
  // engine | <String> => Engine identifier
  engine: "markup",
  // options | <Object> => Engine options
  options: {
    // request | <Object> => 'axios' config options
    request: {
        // url | <String> => URL that should be loaded
        url: "https://...",
    },
    // dom? | <Object> => 'jsdom' config options
    dom: { ... },
    // limit? | <Int> => Limit results returned
    limit: 5,
  },
  // selectors | <Object<Object>> => Use to map the selectors that contain data
  selectors: {
    // root | <Object> => Config to access markup node list that will be mapped.
    root: {
        // value | <String> => Query selector that will map the node list data.
        value: ...
    },
    // selector | <Object> => Use to map data based in tag names
    selector: {
        // value | <String> => Query selector to map data
        value: ...,
        // prefix? | <String> => To prefix the data returned
        prefix: ...,
        // suffix? | <String> => To suffix the data returned
        suffix: ...,
        // inline? | <Boolean> => To format content inline or not
        inline: ...,
        // attribute? | <String> => To fetch data from query selector node attribute
        attribute: ...,
    },
  },
  // metadata? | <Object> => Use it to pass additional data on the response
  metadata: { ... },
  // fork? | <Function> => Use it to extend engine or postprocess data before return
  fork: () => ...
}
```

## Example

```js
// index.js

import Tatooine from "tatooine"

const scraping = {
  engine: "markup",
  options: {
    request: {
      url: "https://github.com/trending/javascript",
    },
    limit: 5,
  },
  selectors: {
    root: {
      value: "article.Box-row",
    },
    title: {
      value: "h1 a",
      inline: true,
    },
    url: {
      value: "h1 a",
      attribute: "href",
      prefix: "https://github.com",
    },
  },
  metadata: {
    name: "Github Trends - JavaScript",
  },
}

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

const schemas = [scraping, rss]

Tatooine(schemas).then(...)
```
