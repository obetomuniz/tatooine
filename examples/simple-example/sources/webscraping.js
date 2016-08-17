export default {
  name: 'GitHub Trends - JavaScript', // [undefined] If you want, you can add more fields to be returned inside of the response.
  type: 'web-scraping', // [required] It's important use this declaration to enable the default "web-scraping" schema.
  urlPrefix: 'https://github.com', // [optional] Add this field to put a url prefix if the results don't have.
  max: 5, // [optional] Add this field to put a limit of fields returned.
  filter: { // [optional] Filter the results that contains a query term
    field: 'url', // [required] Accepts root, title, url, thumbnail, description and date.
    query: 'github.com' // [required] Query term
  },
  requestOptions: { // [required] This field accept all options of "request" module. (e.g. https://www.npmjs.com/package/request)
    url: 'https://github.com/trending/javascript'
  },
  selectors: { // [required] Accepts root, title, url, thumbnail, description and date.
    root: '.repo-list-item', // [required] Here you'll add the loop node. Ex: In a `ul#item-list li` you can add `root: #item-list li`.
    title: '.repo-list-name a',
    url: '.repo-list-name a'
  }
};
