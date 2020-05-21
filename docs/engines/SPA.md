# SPA Engine

SPA Engine is useful for Single Page Applications, Pages with Dynamic Injections of HTML content, etc. The main difference between this engine and Markup Engine is performance. SPA Engine have less performance, but powerful for async content.

```js
const api = {
  // engine: String => Engine identifier
  engine: "spa",
  // options: Object => Engine options
  options: {
    // request: Object => Request settings
    request: {
      // url: String => URL that should be requested
      url: "https://...",
    },
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
    url: "https://davidwalsh.name/demo/lazyload-2.0.php",
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

Tatooine(schemas).then(([{ sources, metadata, error }]) => {
  // Do anything you want with the data extracted.
})
```
