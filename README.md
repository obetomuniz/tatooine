# tatooine: A powerful scraper for JavaScript Developers

<!-- [![Build Status](https://travis-ci.org/obetomuniz/tatooine.svg?branch=main)](https://travis-ci.org/obetomuniz/tatooine)
[![codecov](https://codecov.io/gh/obetomuniz/tatooine/branch/main/graph/badge.svg)](https://codecov.io/gh/obetomuniz/tatooine) -->

<img src="https://cloud.githubusercontent.com/assets/1680157/17003290/a47ea06a-4ea5-11e6-8fc0-c36988534226.png" />

## Installation

```ssh
$ npm install tatooine --save
```

## Demo

[![Try on Replit](https://camo.githubusercontent.com/56417b1780ddc0e04d7c9ce2e4041a437a25aeaa898473a75695723e88a9d043/68747470733a2f2f7265706c2d62616467652e6a616a6f6f73616d2e7265706c2e636f2f7472792e706e67)](https://replit.com/@obetomuniz/Tatooine-in-Action?v=1#index.js)

## How to use

```js
import { scrape } from "tatooine"

const data = await scrape({
  url: "https://betomuniz.com",
  engine: "html",
  options: {
    selectors: { title: { selector: "title" } },
  },
})
```

### Built-in Engines

- [HTML](https://github.com/obetomuniz/tatooine/tree/main/docs/engines/HTML.md) (e.g. Web Scraping)
- [SPA](https://github.com/obetomuniz/tatooine/tree/main/docs/engines/SPA.md) (e.g. Web Scraping for Single Page Applications)
- [JSON](https://github.com/obetomuniz/tatooine/tree/main/docs/engines/JSON.md) (e.g. Web Services, APIs, etc.)
- [XML](https://github.com/obetomuniz/tatooine/tree/main/docs/engines/XML.md) (e.g. RSS, APIs, etc.)

## Extended Features

- [Transformer Plugins](https://github.com/obetomuniz/tatooine/tree/main/docs/plugins/TRANSFORMER.md) - Create your own pre/post data processing flows.
- [Engine Plugins](https://github.com/obetomuniz/tatooine/tree/main/docs/plugins/ENGINE.md) - Create your own engine process using Tatooine runtime ecosystem.
