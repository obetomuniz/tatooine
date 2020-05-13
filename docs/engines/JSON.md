# JSON Engine

```js
const api = {
  // engine: string => Engine identifier
  engine: "json",
  // options: object<object<AxiosConfig>|int> => Engine options
  options: {
    // request: object<AxiosConfig> => Any 'axios' configs
    request: {
        // url: string => URL that should be loaded
        url: "https://...",
    },
    // limit?: int => It limits results returned
    limit: 5,
  },
  // selectors: object<object<string>|string> => It map data list
  selectors: {
    // root?: string => It allows config some parent JSON chain. (Use dot notation as string like `a | a.b.c`)
    root: '...',
    // selector?: object<string> => Key that will store the data extracted
    selector: {
        // value: string => JSON key to extract content
        value: ...,
        // prefix?: string => It allows prefix the `value` returned
        prefix: ...,
        // suffix?: string => It allows suffix the `value` returned
        suffix: ...,
    },
  },
  // metadata?: object<any> => It pass additional data on the response
  metadata: { ... },
  // fork?: function => It extend engine or postprocess data returned
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
