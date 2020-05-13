# JSON Engine

```js
const api = {
  // engine: String => Engine identifier
  engine: "json",
  // options: Object<Object<AxiosConfig>|Integer> => Engine options
  options: {
    // request: Object<AxiosConfig> => 'axios' allowed config
    request: {
        // url: String => URL that should be loaded
        url: "https://...",
    },
    // limit?: Integer => It limits results returned
    limit: 5,
  },
  // selectors: Object<Object<String>|String> => It map data list
  selectors: {
    // root?: String => It allows config some parent JSON chain. (Use dot notation as String like `a | a.b.c`)
    root: '...',
    // selector?: Object<String> => Object key that will store the data extracted as configured
    selector: {
        // value: String => JSON key to extract content
        value: ...,
        // prefix?: String => It allows prefix the `value` returned
        prefix: ...,
        // suffix?: String => It allows suffix the `value` returned
        suffix: ...,
    },
  },
  // metadata?: Object<Any> => It pass additional data on the response
  metadata: { ... },
  // fork?: Function => It extend engine or postprocess data returned
  fork: ({ sources, metadata, error }) => ...
}
```

## Example

```js
// index.js

import Tatooine from "tatooine"

const api = {
  engine: "json",
  options: {
    request: {
      url: "https://jsonplaceholder.typicode.com/photos",
    },
    limit: 5,
  },
  selectors: {
    title: {
      value: "title",
    },
    url: {
      value: "url",
    },
  },
  metadata: {
    name: "JSON Placeholder",
  },
}

const schemas = [api]

Tatooine(schemas).then(...)
```
