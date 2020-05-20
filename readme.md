# Tatooine: A pluggable, simple and powerful web scraper.

[![Build Status](https://travis-ci.org/obetomuniz/tatooine.svg?branch=master)](https://travis-ci.org/obetomuniz/tatooine)
[![codecov](https://codecov.io/gh/obetomuniz/tatooine/branch/master/graph/badge.svg)](https://codecov.io/gh/obetomuniz/tatooine)

<img src="https://cloud.githubusercontent.com/assets/1680157/17003290/a47ea06a-4ea5-11e6-8fc0-c36988534226.png" />

## Installation

```ssh
$ npm install tatooine --save
```

## Docs

```js
// schemas: Array<Schema> => A list of schemas.
// customEngines?: Array<CustomEngine> => An optional list of custom engines.

const promise = Tatooine(schemas, customEngines)
```

### Standard Engines

For convenience, Tatooine provide you with three useful standard engines.

- [Markup Engine docs](https://github.com/obetomuniz/tatooine/tree/master/docs/engines/MARKUP.md) (e.g. RSS, Source Code Scraping, etc.)
- [JSON Engine docs](https://github.com/obetomuniz/tatooine/tree/master/docs/engines/JSON.md) (e.g. APIs, Web Services, etc.)
- [SPA Engine docs](https://github.com/obetomuniz/tatooine/tree/master/docs/engines/SPA.md) (e.g. Single Page Applications, Async Content, etc.)

### Extending Standard Engines

The `fork` property allows extends the engine capabilities for your needs while creating schemas for the standard engines `spa`, `json` and/or `markup`.

```js
// index.js

import Tatooine from "tatooine"

const schemas = [{
  engine: "json",
  options: { ... },
  selectors: { ... },
  fork({ sources, error }) {
    // Do anything you want with the data provided and then;

    return { sources, error };
  }
}]

const promise = Tatooine(schemas)
```

**Note:** The data returned in `fork` as parameter is the data already processed using the given schema configs.

### Custom Engines

Beyond the standard engines, you can also create **custom engines** with your own rules whenever needed. Basically, you should follow the structure below to extend Tatooine's engine capabilities:

```js
// xyz-engine.js

function getSourcesFromSomewhere(schema) {
  // Your engine logic
}

export default {
  engine: "xyz",
  run: getSourcesFromSomewhere,
}
```

```js
// xyz-schema.js

export default {
  engine: "xyz",
  ...
};
```

```js
// index.js

import Tatooine from "tatooine"

import xyzEngine from "./xyz-engine.js"
import xyzSchema from "./xyz-schema.js"

const promise = Tatooine([xyzSchema], [xyzEngine])
```

## Examples

And there is much more, take a look at some recipes below. We will be adding more and more examples as needed. PRs are welcomed 😁.

- [XML](https://github.com/obetomuniz/tatooine/tree/master/docs/recipes/simple/XML.md)
