export default {
  type: 'customschema',
  name: 'Custom Source',
  requestOptions: {
    url: 'https://dribbble.com/'
  },
  selectors: {
    root: '.dribbble',
    image: '.dribbble-img img',
    title: '.dribbble-over strong'
  }
};
