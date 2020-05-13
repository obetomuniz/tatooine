# Markup Engine

```js
const api = {
  // engine: String => Engine identifier
  engine: "markup",
  // options: Object<Object<AxiosConfig?|Object<Boolean>|Object<String>>JSDOMConfig>|Integer> => Engine options
  options: {
    // request: Object<AxiosConfig?|Object<Boolean>|Object<String>> => It allows configure markup request. Non-spa allows any 'axios' config.
    request: {
        // spa?: Boolean => Set this schema as a SPA resource (It will use Puppeteer for request, which is slower). Default is <false>
        spa: false,
        // url: String => URL that should be loaded
        url: "https://...",
    },
    // dom?: Object<JSDOMConfig> => Any 'jsdom' allowed config
    dom: { ... },
    // limit?: Integer => It limits results returned
    limit: 5,
  },
  // selectors: Object<Object<String>> => Use to map the selectors that contain data
  selectors: {
    // root: Object<String> => It allows access the markup node list that will have the data mapped.
    root: {
        // value: String => Query selector of the node list root.
        value: '...'
    },
    // selector: Object<String|Boolean> => Object key that will store the data extracted as configured
    selector: {
        // value: String => Query selector to extract content
        value: '...',
        // prefix?: String => It allows prefix the data returned
        prefix: '...',
        // suffix?: String => It allows suffix the data returned
        suffix: ...,
        // inline?: Boolean => It format content inline or not. Default is <true>
        inline: true,
        // attribute?: String => It allows fetch the data from some node attribute
        attribute: '...',
    },
  },
  // metadata?: Object<Any> => It allows to pass additional data on the response
  metadata: { ... },
  // fork? : Function => It allows to extend engine or postprocess data returned
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
