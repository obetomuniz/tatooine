const spa = {
  engine: "spa",
  options: {
    request: {
      url: "https://davidwalsh.name/demo/lazyload-2.0.php",
      config: {
        launch: {
          executablePath: "/opt/homebrew/bin/chromium",
        },
      },
    },
  },
  selectors: {
    root: {
      value: ".demo-wrapper table tr",
    },
    src: {
      value: ".image img",
      attribute: "src",
      prefix: "https:",
    },
  },
  metadata: {
    name: "SPA Demo",
  },
}

const scraping = {
  engine: "markup",
  options: {
    request: {
      url: "https://github.com/trending/javascript",
    },
    limit: 5,
  },
  selectors: {
    root: {
      value: "article.Box-row",
    },
    title: {
      value: "h1 a",
      inline: false,
    },
    url: {
      value: "h1 a",
      attribute: "href",
      prefix: "https://github.com",
    },
  },
  metadata: {
    name: "Github Trends - JavaScript",
  },
}

const rss = {
  engine: "markup",
  options: {
    request: {
      url: "https://dev.to/feed/obetomuniz",
    },
    xml: true,
  },
  selectors: {
    root: {
      value: "channel item",
    },
    title: {
      value: "title",
    },
    url: {
      value: "link",
    },
  },
  metadata: {
    name: "Beto Muniz's Drops",
  },
  fork: (data) => data,
}

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
  fork: (data) => data,
}

const invalidJSONKeys = {
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
    xpto: {
      value: "xpto",
    },
  },
  metadata: {
    name: "JSON Placeholder",
  },
}

const invalidMarkupQuerySelectors = {
  engine: "markup",
  options: {
    request: {
      url: "https://github.com/trending/javascript",
    },
  },
  selectors: {
    root: {
      value: "article.Box-row",
    },
    xpto: {
      value: "xpto",
    },
    abcd: {
      value: "abcd",
      attribute: "xyz",
    },
  },
  metadata: {
    name: "Github Trends - JavaScript",
  },
}

const invalidSPAQuerySelectors = {
  engine: "spa",
  options: {
    request: {
      url: "https://davidwalsh.name/demo/lazyload-2.0.php",
      config: {
        launch: {
          executablePath: "/opt/homebrew/bin/chromium",
        },
      },
    },
  },
  selectors: {
    root: {
      value: "article.Box-row",
    },
    xpto: {
      value: "xpto",
    },
    abcd: {
      value: "abcd",
      attribute: "xyz",
    },
  },
  metadata: {
    name: "SPA Demo",
  },
}

const invalidJSONSchema = {
  engine: "json",
  metadata: {
    name: "Invalid JSON Schema",
  },
}

const invalidMarkupSchema = {
  engine: "markup",
  metadata: {
    name: "Invalid Markup Schema",
  },
}

const invalidSPASchema = {
  engine: "spa",
  metadata: {
    name: "Invalid SPA Schema",
  },
}

export default {
  valid: [
    spa,
    scraping,
    rss,
    api,
    invalidJSONKeys,
    invalidMarkupQuerySelectors,
    invalidSPAQuerySelectors,
  ],
  invalid: [invalidJSONSchema, invalidMarkupSchema, invalidSPASchema],
}
