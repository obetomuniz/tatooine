export default {
  name: 'Smashing Magazine', // [undefined] If you want, you can add more fields to be returned inside of the response.
  type: 'rss', // [required] It's important use this declaration to enable the default "rss" schema.
  urlPrefix: null, // [optional] Add this field to put a url prefix if the results don't have.
  max: 5, // [optional] Add this field to put a limit of fields returned.
  filter: { // [optional] Filter the results that contains a query term
    field: 'url', // [required] Accepts root, title, url, thumbnail, description and date.
    query: 'smashingmagazine.com' // [required] Query term
  },
  requestOptions: { // [required] This field accept all options of "request" module. (e.g. https://www.npmjs.com/package/request)
    url: 'https://www.smashingmagazine.com/feed/'
  },
  selectors: { // [required] Accepts root, title, url, thumbnail, description and date.
    root: 'channel item', // [required] Here you'll add the loop node. Ex: In a `ul#item-list li` you can add `root: #item-list li`.
    title: 'title',
    url: 'link'
  }
};
