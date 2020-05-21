# JSON Engine

JSON Engine is useful for APIs, Static JSON files, Raw JSON, etc.

```js
const api = {
  // engine: String => Engine identifier
  engine: "json",
  // options: Object=> Engine options
  options: {
    // request: Object => Request settings
    request: {
      // url: String => URL that should be requested
      url: "https://...",
      // headers?: Object => Request headers
      headers: ...,
    },
    // limit?: Integer => Limits results returned
    limit: 5,
  },
  // selectors: Object => Maps data list
  selectors: {
    // root?: String => If needed, it allows config some root key in the JSON data returned
    root: {
      // value: StringChain => Path of the list to be iterated. Use chains for deep mapping (E.g.: 'a', 'a.b.c', 'a.b.d[0]', 'x[0].a')
      value: '...'
    },
    // selector?: Object => Object key that will store the data extracted as configured
    selector: {
        // value: StringChain => Path to extract content. Use chains for deep mapping (E.g.: 'a', 'a.b.c', 'a.b.d[0]', 'x[0].a')
        value: '...',
        // prefix?: String => Allows prefix the `value` returned
        prefix: '...',
        // suffix?: String => Allows suffix the `value` returned
        suffix: '...',
    },
  },
  // metadata?: Any => Allows pass additional data on the response
  metadata: ...,
  // fork?: Function => Allows extend engine or postprocess data returned
  fork: ({ sources, error }) => ...
}
```

## Example

```js
// index.js

import Tatooine from "tatooine"

const json = {
  engine: "json",
  options: {
    url: "https://jsonplaceholder.typicode.com/photos",
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

const schemas = [json]

Tatooine(schemas).then(([{ sources, metadata, error }, ...]) => ...)
```
