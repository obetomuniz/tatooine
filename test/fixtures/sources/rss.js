export default {
  slug: 'smashingmagazine',
  type: 'rss',
  category: 'development',
  language: 'en_us',
  name: 'Smashing Magazine',
  origin: 'https://www.smashingmagazine.com/',
  max: 5,
  filter: {
    field: 'url',
    query: 'smashingmagazine.com'
  },
  thumbnail: null,
  requestOptions: {
    url: 'https://www.smashingmagazine.com/feed/'
  },
  selectors: {
    root: 'channel item',
    thumbnail: null,
    title: 'title',
    description: null,
    date: 'pubDate',
    url: 'link'
  }
};
