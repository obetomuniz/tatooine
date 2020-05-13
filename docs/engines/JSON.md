# JSON Engine

```js
const api = {
  // engine | <String> => Engine identifier
  engine: "json",
  // options | <Object> => Engine options
  options: {
    // request | <Object> => 'axios' configs
    request: {
        // url | <String> => URL that should be loaded
        url: "https://...",
    },
    // limit? | <Int> => Limit results returned
    limit: 5,
  },
  // selectors | <Object<Object>> => It map data
  selectors: {
    // root? | <String> => It allows config to access data list from some parent JSON node. (Use dot notation like `a.b.c`)
    root: '...',
    // ?selector? | <Any> => It map data based in JSON node key
    selector: {
        // value | <String> => JSON node key value to map
        value: ...,
        // prefix? | <String> => It prefix the `value` returned
        prefix: ...,
        // suffix? | <String> => It suffix the `value` returned
        suffix: ...,
    },
  },
  // metadata? | <Object> => It pass additional data on the response
  metadata: { ... },
  // fork? | <Function> => It extend engine or postprocess data before return
  fork: () => ...
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
