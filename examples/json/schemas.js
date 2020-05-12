const api = {
  engine: "json",
  requestOptions: {
    url: "https://jsonplaceholder.typicode.com/photos",
  },
  selectors: {
    // root: "a.b.c", <- If needed, you can even pass a `root` config to access children data from a parent JSON node.
    title: {
      value: "title",
    },
    url: {
      value: "url",
    },
  },
  limit: 5,
  metadata: {
    name: "JSON Placeholder",
  },
}

export default [api]
