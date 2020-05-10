# Tatooine: A pluggable, simple and powerful web scraper.

<!-- [![Dependency Status](https://dependencyci.com/github/obetomuniz/tatooine/badge)](https://dependencyci.com/github/obetomuniz/tatooine)
[![Build Status](https://travis-ci.org/obetomuniz/tatooine.svg?branch=master)](https://travis-ci.org/obetomuniz/tatooine)
[![Coverage Status](https://coveralls.io/repos/github/obetomuniz/tatooine/badge.svg?branch=master)](https://coveralls.io/github/obetomuniz/tatooine?branch=master) -->

<img src="https://cloud.githubusercontent.com/assets/1680157/17003290/a47ea06a-4ea5-11e6-8fc0-c36988534226.png" />

## Installation

```ssh
$ npm install tatooine --save
```

## Documentation

```js
const promise = Tatooine(schemas, customEngines)
```

**@param schemas {Array\<Object\>}**

A list of schemas following the default and/or custom engines registered.

**@param customEngines {Array\<Promise\>}**

A list of custom engines to be registered.

**@return {Promise}**

Returns a promise with data sources.

## Default Engines

For convenience, Tatooine came with two useful engines.

- [Nodes Engine docs](https://github.com/obetomuniz/tatooine/tree/master/examples/nodes) (e.g. RSS, Web Scraping, etc.)
- [JSON Engine docs](https://github.com/obetomuniz/tatooine/tree/master/examples/json) (e.g. APIs, Web Services, etc.)

## Custom Engines

Not just the standard engines, you can also create **custom engines** with your own rules. Basically, you should follow the structure below to extend Tatooine capabilities:

```js
// custom-engine.js

function getSourcesFromSomewhere(schema) {
  // Your engine logic
}

export default {
  engine: "custom",
  process: getSourcesFromSomewhere,
}
```

```js
// schemas.js

export default [{
  engine: "custom",
  ...
}];
```

```js
// index.js

import Tatooine from "tatooine"

import customengine from "./custom-engine.js"
import schemas from "./schemas.js"

const promise = Tatooine(schemas, [customengine])
```
