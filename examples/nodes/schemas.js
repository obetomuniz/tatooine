const scraping = {
  engine: "nodes",
  requestOptions: {
    url: "https://github.com/trending/javascript",
  },
  selectors: {
    root: {
      value: "article.Box-row",
    },
    title: {
      value: "h1 a",
      inline: true,
    },
    url: {
      value: "h1 a",
      attribute: "href",
      prefix: "https://github.com",
    },
  },
  limit: 5,
  metadata: {
    name: "Github Trends - JavaScript",
  },
}

const rss = {
  engine: "nodes",
  requestOptions: {
    url: "https://www.smashingmagazine.com/feed",
    contentType: "text/xml",
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
}

export default [scraping, rss]
