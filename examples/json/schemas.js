const api = {
  engine: "json",
  requestOptions: {
    url: "https://jsonplaceholder.typicode.com/photos",
  },
  selectors: {
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
