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
      url: "https://www.smashingmagazine.com/feed",
    },
    dom: {
      contentType: "text/xml",
    },
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
    name: "Smashing Magazine",
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

const staticFile = {
  engine: "json",
  options: {
    request: {
      url:
        "https://raw.githubusercontent.com/minasdev/eventos/master/events.json",
    },
    limit: 5,
  },
  selectors: {
    root: "events",
    name: {
      value: "name",
    },
  },
  metadata: {
    name: "Minas Dev Eventos",
  },
}

const invalidJSON = {
  engine: "json",
  metadata: {
    name: "Invalid JSON Engine",
  },
}

const invalidMarkup = {
  engine: "markup",
  metadata: {
    name: "Invalid Markup Engine",
  },
}

export default [scraping, rss, api, staticFile, invalidJSON, invalidMarkup]
