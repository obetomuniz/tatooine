# Tatooine: A simple and powerful web scraper.

<!-- [![Build Status](https://travis-ci.org/obetomuniz/tatooine.svg?branch=master)](https://travis-ci.org/obetomuniz/tatooine)
[![codecov](https://codecov.io/gh/obetomuniz/tatooine/branch/master/graph/badge.svg)](https://codecov.io/gh/obetomuniz/tatooine) -->

<img src="https://cloud.githubusercontent.com/assets/1680157/17003290/a47ea06a-4ea5-11e6-8fc0-c36988534226.png" />

## Installation

```ssh
$ npm install tatooine --save
```

## How to use

```js
import { parse } from "tatooine"

const data = await parse({
  url: "https://betomuniz.com",
  engine: "html",
  options: {
    selectors: { title: { selector: "title" } },
  },
})
```

### Supported Engine Docs

- [HTML](https://github.com/obetomuniz/tatooine/tree/master/docs/engines/MARKUP.md) (e.g. Web Scraping, Single Page Applications, etc.)
- [JSON](https://github.com/obetomuniz/tatooine/tree/master/docs/engines/JSON.md) (e.g. APIs, Web Services, etc.)
- [XML](https://github.com/obetomuniz/tatooine/tree/master/docs/engines/SPA.md) (e.g. RSS, APIs, etc.)
