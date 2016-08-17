export default {
  name: 'JSON Placeholder', // [undefined] If you want, you can add more fields to be returned inside of the response.
  type: 'api', // [required] It's important use this declaration to enable the default "api" schema.
  urlPrefix: null, // [optional] Add this field to put a url prefix if the results don't have.
  max: 5, // [optional] Add this field to put a limit of fields returned.
  filter: { // [optional] Filter the results that contains a query term
    field: 'url', // [required] Accepts root, title, url, thumbnail, description and date.
    query: 'placehold.it' // [required] Query term
  },
  requestOptions: { // [required] This field accept all options of "request" module. (e.g. https://www.npmjs.com/package/request)
    url: 'https://jsonplaceholder.typicode.com/photos'
  },
  selectors: { // [required] Accepts title, url, thumbnail, description and date.
    title: '.title',
    url: '.url'
  }
};
