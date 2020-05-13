# Markup Engine

```js
const api = {
  // engine: string => Engine identifier
  engine: "markup",
  // options: object<object<AxiosConfig|JSDOMConfig>|int> => Engine options
  options: {
    // request: object<AxiosConfig> => 'axios' allowed config
    request: {
        // url: string => URL that should be loaded
        url: "https://...",
    },
    // dom?: object<JSDOMConfig> => 'jsdom' allowed config
    dom: { ... },
    // limit?: int => It limits results returned
    limit: 5,
  },
  // selectors: object<object<string>> => Use to map the selectors that contain data
  selectors: {
    // root: object<string> => Config to access markup node list that will be mapped.
    root: {
        // value: string => Root query selector that will map a specific node list data.
        value: ...
    },
    // selector: object<string|bool> => Key that will store the data extracted as configured
    selector: {
        // value: string => Query selector key to extract content
        value: ...,
        // prefix?: string => It allows prefix the data returned
        prefix: ...,
        // suffix?: string => It allows suffix the data returned
        suffix: ...,
        // inline?: boolean => It format content inline or not
        inline: ...,
        // attribute?: string => It allows fetch the data from some node attribute
        attribute: ...,
    },
  },
  // metadata?: object<> => It allows to pass additional data on the response
  metadata: { ... },
  // fork? : function => It allows to extend engine or postprocess data returned
  fork: ({ sources, metadata, error }) => ...
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
