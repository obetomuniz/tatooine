# Tatooine: A pluggable, simple and powerful web scraper.

[![Dependency Status](https://dependencyci.com/github/obetomuniz/tatooine/badge)](https://dependencyci.com/github/obetomuniz/tatooine)
[![Build Status](https://travis-ci.org/obetomuniz/tatooine.svg?branch=master)](https://travis-ci.org/obetomuniz/tatooine)
[![Coverage Status](https://coveralls.io/repos/github/obetomuniz/tatooine/badge.svg?branch=master)](https://coveralls.io/github/obetomuniz/tatooine?branch=master)

<img src="https://cloud.githubusercontent.com/assets/1680157/17003290/a47ea06a-4ea5-11e6-8fc0-c36988534226.png" />

## Installation

```ssh
$ npm install tatooine --save
```

## Examples

- [Simple Example](https://github.com/obetomuniz/tatooine/tree/master/examples/simple-example/)
- [Custom Schema Example](https://github.com/obetomuniz/tatooine/tree/master/examples/custom-schema-example/)

## Documentation

```js
const tatooine = new Tatooine(sources (Array of Objects), callback (Function), options (Object));
```

**[required] sources**

Look for the [Default Schemas](#default-schemas) and [Custom Schemas](#custom-schemas) sections to learn what you can add here.

**[required] callback**

Return an array with the responses

**[optional] options**

An object thats allow configure Tatooine to accept the following options:

`schemas`: An array of objects that allow you plug and play with new schemas beyond of the schemas provided by Tatooine.


### Default Schemas

Tatooine comes for you with three default schemas ready to use and they can be used with this instructions:

- [Web Scraping Schema docs](https://github.com/obetomuniz/tatooine/tree/master/examples/simple-example/sources/webscraping.js)
- [API Schema docs](https://github.com/obetomuniz/tatooine/tree/master/examples/simple-example/sources/api.js)
- [RSS Schema docs](https://github.com/obetomuniz/tatooine/tree/master/examples/simple-example/sources/rss.js)

### Custom Schemas

Beyond of the schemas provided by default, you can create and plugin schemas with yours specific rules. Basically, you should follow this way to extend Tatooine and use this feature:

```js
// yourschema.js
export default {
  type: 'yourschema', // [required] This will connect your custom schema with you custom source.
  schema(body, source) { // [required] [parameters: body and source] Here you'll be able to create the logic of your schema.
    let results = [];

    // Your rules

    return results; // [required] It should return an array of objects with the results
  }
};
```
```js
// yoursource.js
export default {
  type: 'yourschema', // [required] It will connect your custom schema with you custom source.
  requestOptions: { // [required] This field accept all options of "request" module. (e.g. https://www.npmjs.com/package/request)
    url: 'https://urltoconsume.com/'
  }
};
```

To understand and for a easy usage of this feature is highly recommended look for the code of [this example](https://github.com/obetomuniz/tatooine/tree/master/examples/custom-schema-example/).

### BONUS: Usage of Tatooine inside of an old project

If you are using the old ES5 syntax in your project, use this declaration to inject Tatooine as a dependency:

```js
var Tatooine = require('tatooine').default;
```

#### License

[The MIT License (MIT)](https://betomuniz.mit-license.org/)

Copyright (c) 2016 Beto Muniz (http://betomuniz.com/)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
