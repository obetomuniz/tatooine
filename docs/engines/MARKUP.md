# Markup Engine

```js
const api = {
  // engine: String => Engine identifier
  engine: "markup",
  // options: Object => Engine options
  options: {
    // request: Object => Allows any Axios configs. More info https://github.com/axios/axios#axios-api
    request: {
        // url: String => URL that should be loaded
        url: "https://...",
        ...
    },
    // dom?: JSDOMConfig => Any JSDOM allowed config. More info https://github.com/jsdom/jsdom#customizing-jsdom
    dom: { ... },
    // limit?: Integer => Limits results returned
    limit: 5,
  },
  // selectors: Object => Maps the selectors that contain data
  selectors: {
    // root: Object => Allows access a markup HTML Node List that will have the data mapped
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
