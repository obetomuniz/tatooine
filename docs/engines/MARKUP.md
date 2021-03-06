# Markup Engine

Markup Engine is useful for SSR pages, Static HTML documents, RSS Feeds, etc. The main difference between this engine and SPA Engine is performance. Markup Engine have more performance, but less powerful for async content.

```js
const api = {
  // engine: String => Engine identifier
  engine: "markup",
  // options: Object => Engine options
  options: {
    // request: Object => Request settings
    request: {
      // url: String => URL that should be requested
      url: "https://...",
      // headers?: Object => Request headers
      headers: ...,
    },
    // xml?: Flag if the content is XML or not. Default is <false>
    xml: false,
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
    url: "https://github.com/trending/javascript",
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

const schemas = [markup, rss]

Tatooine(schemas).then(([markupSources, rssSources]) => {
  // Do anything you want with the data extracted.
})
```
