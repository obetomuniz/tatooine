export default {
  type: 'customschema', // [required] It will connect your custom schema with you custom source.
  name: 'Dribbble', // [undefined] If you want, you can add more fields to be returned inside of the response.
  requestOptions: { // [required] This field accept all options of "request" module. (e.g. https://www.npmjs.com/package/request)
    url: 'https://dribbble.com/'
  },
  selectors: {
    root: '.dribbble',
    image: '.dribbble-img img',
    title: '.dribbble-over strong'
  }
};
