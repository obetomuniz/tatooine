import _ from 'lodash';

export default {
  type: 'api',
  schema(body, source) {
    let results = [];
    const { thumbnail, title, url, description, date } = source.selectors;
    const content = { body: JSON.parse(body) };
    const urlPrefix = source.urlPrefix || '';
    const maxResults = source.max || content.body.length;

    results = content.body.slice(0, maxResults).map((item, i) => {
      const struct = _.pickBy({
        thumbnail: (thumbnail) ? _.get(content, `body[${i}]${thumbnail}`) : null,
        title: (title) ? _.get(content, `body[${i}]${title}`) : null,
        url: (url) ? `${urlPrefix}${_.get(content, `body[${i}]${url}`)}` : null,
        description: (description) ? _.get(content, `body[${i}]${description}`) : null,
        date: (date) ? _.get(content, `body[${i}]${date}`) : null
      });

      return struct;
    });

    if (source.filter && source.filter.field && source.filter.query) {
      results = results.filter((k) => k[source.filter.field].indexOf(source.filter.query) > 0);
    }

    return results.slice(0, maxResults);
  }
};
