# Tatooine: A pluggable, simple and powerful web scraper.

<img src="https://cloud.githubusercontent.com/assets/1680157/17003290/a47ea06a-4ea5-11e6-8fc0-c36988534226.png" />

## Installation

```ssh
$ npm install tatooine --save
```

## Boilerplate

```js
// sources.js
export default [{
    type: 'schema',
    requestOptions: {
      url: 'https://source.com'
    },
    selectors: {
      ...
    }
  },
...
];
```

```js
// index.js
import Tatooine from 'tatooine';
import sources from './sources';

const tatooine = new Tatooine(sources, (response) => {
  ...
});
```

## Usage

Tatooine come to us with some defaults schemas and below you can check how to use they:

```js
// sources/api.default-schema.js
export default {
  name: 'JSON Placeholder', // [undefined] If you want, you can add more fields to be returned.
  type: 'api', // [required] It's important use this declaration to enable the default "api" schema.
  urlPrefix: null, // [optional] Add this field to put a url prefix if the results don't have.
  max: 5, // [optional] Add this field to put a limit of fields returned.
  requestOptions: { // [required] This field accept all options of "request" module. (e.g. https://www.npmjs.com/package/request)
    url: 'https://jsonplaceholder.typicode.com/photos'
  },
  selectors: { // [required] Accepts title, url, thumbnail, description and date.
    title: '.title',
    url: '.url'
  }
};
```
```js
// sources/rss.default-schema.js
export default {
  name: 'Smashing Magazine', // [undefined] If you want, you can add more fields to be returned.
  type: 'rss', // [required] It's important use this declaration to enable the default "rss" schema.
  urlPrefix: null, // [optional] Add this field to put a url prefix if the results don't have.
  max: 5, // [optional] Add this field to put a limit of fields returned.
  requestOptions: { // [required] This field accept all options of "request" module. (e.g. https://www.npmjs.com/package/request)
    url: 'https://www.smashingmagazine.com/feed/'
  },
  selectors: { // [required] Accepts root, title, url, thumbnail, description and date.
    root: 'channel item', // [required] Here you'll add the loop node. Ex: In a `ul#item-list li` you can add `root: #item-list li`.
    title: 'title',
    url: 'link'
  }
};
```
```js
// sources/webscraping.default-schema.js
export default {
  name: 'GitHub Trends - JavaScript', // [undefined] If you want, you can add more fields to be returned.
  type: 'web-scraping', // [required] It's important use this declaration to enable the default "web-scraping" schema.
  urlPrefix: 'https://github.com', // [optional] Add this field to put a url prefix if the results don't have.
  max: 5, // [optional] Add this field to put a limit of fields returned.
  requestOptions: { // [required] This field accept all options of "request" module. (e.g. https://www.npmjs.com/package/request)
    url: 'https://github.com/trending/javascript'
  },
  selectors: { // [required] Accepts root, title, url, thumbnail, description and date.
    root: '.repo-list-item', // [required] Here you'll add the loop node. Ex: In a `ul#item-list li` you can add `root: #item-list li`.
    title: '.repo-list-name a',
    url: '.repo-list-name a'
  }
};
```
```js
// [optional] source loader
// sources/index.js
import webScrapingSrc from './webscraping.default-schema';
import rssSrc from './rss.default-schema';
import apiSrc from './api.default-schema';

export default [webScrapingSrc, rssSrc, apiSrc];
```
```js
// index.js
import Tatooine from 'tatooine';
import sources from './sources';

const tatooine = new Tatooine(sources, (response) => {
  ...
});
```

## Custom Usage

Beyond the defaults schemas, Tatooine allows you plug and play custom schemas, below you can check how to use this functionality:

```js
// schema.custom.js
import cheerio from 'cheerio';

export default {
  type: 'customschema', // [required] It will connect your custom schema with you custom source.
  schema(body, source) { // [required] [parameters: body and source] Here you'll be able to create the logic of your schema.
    let results = [];
    const { root, image, title } = source.selectors;
    const $ = cheerio.load(body);

    $(root).slice(0, 5).each(function () {
      const struct = {
        image: (image) ? $(this).find(image).attr('src') : null,
        title: (title) ? $(this).find(title).text().trim() : null
      };

      results = [...results, struct];
    });

    // This schema should return 5 results from a source and each one will have a image and a title.
    return results;
  }
};
```
```js
// sources.custom-schema.js
export default [{
    type: 'customschema', // [required] It will connect your custom schema with you custom source.
    name: 'Custom Source',
    requestOptions: { // [required] This field accept all options of "request" module. (e.g. https://www.npmjs.com/package/request)
      url: 'https://dribbble.com/'
    },
    selectors: {
      root: '.dribbble',
      image: '.dribbble-img img',
      title: '.dribbble-over strong'
    }
  },
...
];
```
```js
// index.js
import Tatooine from 'tatooine';
import customSchema from './schema.custom';
import sources from './src.custom-schema';

const tatooine = new Tatooine(sources, (response) => {
  ...
}, {
  schemas: [customSchema] // [optional] All Custom Schemas should be declared using this option.
});
```

### BONUS: Optional installation to use ES6 syntax

All the examples above are using the ES6 syntax, so you will need run the steps below to work:

**Note:** *It is not required to use the package, so if you are using the old ES5 syntax in your project, you'll need research how use this module (e.g. It's something like `var Tatooine = required('tatooine').default;`)*.

1) Install the dependencies:
```ssh
$ npm install nodemon babel-cli babel-preset-es2015 --save-dev
```
2) Create a `.babelrc` file with the following content in the root folder of your project:
```json
{
  "presets": ["es2015"]
}
```
3) Finally, Run the following command in your terminal inside of your project folder:
```ssh
$ nodemon index.js --exec babel-nod
```

#### Enjoy :D

## License

[The MIT License (MIT)](https://betomuniz.mit-license.org/)

Copyright (c) 2016 Beto Muniz (http://betomuniz.com/)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
