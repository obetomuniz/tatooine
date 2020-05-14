# SPA Engine

```js
const api = {
  // engine: String => Engine identifier
  engine: "spa",
  // options: Object => Engine options
  options: {
    // request: Object => Configures SPA request. Allows any Puppeteer configs too.
    request: {
        // url: String => URL that should be loaded
        url: "https://...",
        // events?: Object => Request events
        events: {
          // onBrowserLoad?: Function => Allows control PuppeteerBrowserClass before create a new page.
          onBrowserLoad: (browser) => ...,
          // willPageLoad?: Function => Allows control PuppeteerPageClass before load URL.
          willPageLoad: (page) => ...,
          // onPageLoad?: Function => Allows control PuppeteerPageClass after load URL.
          onPageLoad: (page) => ...,
          // onContentLoad?: Function => Allows control PuppeteerPageClass and content string loaded.
          onContentLoad: (content, page) => ...,
        },
        ...
    },
    // dom?: JSDOMConfig => Any JSDOM allowed config
    dom: { ... },
    // limit?: Integer => Limits results returned
    limit: 5,
  },
  // selectors: Object => Maps the selectors that contain data
  selectors: {
    // root: Object => Allows access a HTML Node List that will have the data mapped
    root: {
        // value: String => Query selector of the HTML Node List. (E.g.: 'ul li', '.articles-list article', etc.)
        value: '...'
    },
    // selector: Object => Object key that will store the data extracted as configured
    selector: {
        // value: String => Query selector to extract content from HTML node (E.g.: 'a', 'h2.article-title', etc.)
        value: '...',
        // prefix?: String => Allows prefix the data returned
        prefix: '...',
        // suffix?: String => Allows suffix the data returned
        suffix: '...',
        // inline?: Boolean => Format content inline or not. Default is <true>
        inline: true,
        // attribute?: String => Allows extract content from node attribute (E.g.: 'href', 'data-src', etc.)
        attribute: '...',
    },
  },
  // metadata?: Any => Allows pass additional data on the response
  metadata: ...,
  // fork? : Function => Allows extend engine or postprocess data returned
  fork: ({ sources, error }) => ...
}
```

## Example

```js
// index.js

import Tatooine from "tatooine"

const spa = {
  engine: "spa",
  options: {
    request: {
      url: "https://davidwalsh.name/demo/lazyload-2.0.php",
    },
  },
  selectors: {
    root: {
      value: ".demo-wrapper table tr",
    },
    src: {
      value: ".image img",
      attribute: "src",
      prefix: "https:",
    },
  },
  metadata: {
    name: "SPA Demo",
  },
}

const schemas = [spa]

Tatooine(schemas).then(...)
```
