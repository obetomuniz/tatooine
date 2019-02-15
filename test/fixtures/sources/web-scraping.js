export default {
  slug: 'githubtrendsjavascript',
  type: 'web-scraping',
  category: 'development',
  language: 'en_us',
  name: 'Github Trends - JavaScript',
  origin: 'https://github.com/',
  urlPrefix: 'https://github.com',
  max: 5,
  filter: {
    field: 'url',
    query: 'github.com'
  },
  thumbnail: null,
  requestOptions: {
    url: 'https://github.com/trending/javascript'
  },
  selectors: {
    root: '.repo-list li',
    thumbnail: null,
    title: 'h3 a',
    description: null,
    date: null,
    url: 'h3 a'
  }
};
