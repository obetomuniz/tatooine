# Tatooine: A pluggable, simple and powerful web scraper.

[![Build Status](https://travis-ci.org/obetomuniz/tatooine.svg?branch=master)](https://travis-ci.org/obetomuniz/tatooine)
[![codecov](https://codecov.io/gh/obetomuniz/tatooine/branch/master/graph/badge.svg)](https://codecov.io/gh/obetomuniz/tatooine)

<img src="https://cloud.githubusercontent.com/assets/1680157/17003290/a47ea06a-4ea5-11e6-8fc0-c36988534226.png" />

## Installation

```ssh
$ npm install tatooine --save
```

## Documentation

```js
// schemas          {Array} => A list of schemas following the standard and/or custom engines registered.
// customEngines?   {Array} => Optional list of custom engines to be registered.

const promise = Tatooine(schemas, customEngines)
```

### Standard Engines

For convenience, Tatooine came with two useful standard engines.

- [Markup Engine docs](https://github.com/obetomuniz/tatooine/tree/master/docs/engines/MARKUP.md) (e.g. RSS, Web Scraping, etc.)
- [JSON Engines docs](https://github.com/obetomuniz/tatooine/tree/master/docs/engines/JSON.md) (e.g. APIs, Web Services, etc.)

### Extending Standard Engines

The `fork` property allows extends the engine capabilities for your needs while creating schemas for the standard engines `json` or `markup`.

```js
// index.js

import Tatooine from "tatooine"

import customengine from "./custom-engine.js"
import schemas from "./schemas.js"

const schemas = [{
  engine: "json",
  options: { ... },
  selectors: { ... },
  fork({ sources, metadata, error }) {
    // Do anything you want with the data provided and then;

    return { sources, metadata, error };
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
// schemas.js

export default [{
  engine: "xyz",
  ...
}];
```

```js
// index.js

import Tatooine from "tatooine"

import xyzEngine from "./xyz-engine.js"
import schemas from "./schemas.js"

const promise = Tatooine(schemas, [xyzEngine])
```
