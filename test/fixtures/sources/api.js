export default {
  slug: 'jsonplaceholder',
  type: 'api',
  category: 'development',
  language: 'en_us',
  name: 'JSON Placeholder',
  origin: 'https://jsonplaceholder.typicode.com/',
  max: 5,
  filter: {
    field: 'url',
    query: 'placehold.it'
  },
  thumbnail: null,
  requestOptions: {
    url: 'https://jsonplaceholder.typicode.com/photos'
  },
  selectors: {
    thumbnail: '.thumbnailUrl',
    title: '.title',
    url: '.url'
  }
};
