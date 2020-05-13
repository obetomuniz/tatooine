# Markup Engine

```js
const api = {
  // engine: String => Engine identifier
  engine: "markup",
  // options: Object => Engine options
  options: {
    // request: Object | AxiosConfig? => Allows configure markup request. Non-SPA allows Axios settings.
    request: {
        // url: String => URL that should be loaded
        url: "https://...",
        // spa?: Object => Set this schema as a SPA resource
        spa: {
          // enable: Boolean => Enable Puppeteer for requests on the given schema, which is slower, but powerful. Default is <false>
          enable: false,
          // onPageLoaded?: PuppeteerPageObject => Allows control the page crawled using Puppeteer 'page' object
          onPageLoaded: (page) => ...,
        },
    },
    // dom?: JSDOMConfig => Any JSDOM allowed config
    dom: { ... },
    // limit?: Integer => Limits results returned
    limit: 5,
  },
  // selectors: Object => Maps the selectors that contain data
  selectors: {
    // root: Object => Allows access the markup node list that will have the data mapped.
    root: {
        // value: String => Query selector of the node list root.
        value: '...'
    },
    // selector: Object => Object key that will store the data extracted as configured
    selector: {
        // value: String => Query selector to extract content
        value: '...',
        // prefix?: String => Allows prefix the data returned
        prefix: '...',
        // suffix?: String => Allows suffix the data returned
        suffix: '...',
        // inline?: Boolean => Format content inline or not. Default is <true>
        inline: true,
        // attribute?: String => Allows fetch the data from some node attribute
        attribute: '...',
    },
  },
  // metadata?: Any => Allows pass additional data on the response
  metadata: ...,
  // fork? : Function => Allows extend engine or postprocess data returned
  fork: ({ sources, metadata, error }) => ...
}
```

## Example

```js
// index.js

import Tatooine from "tatooine"

const markup = {
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

const schemas = [markup]

Tatooine(schemas).then(...)
```
