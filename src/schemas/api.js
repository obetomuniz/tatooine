import _ from 'lodash';

export default {
  type: 'api',
  schema(body, source) {
    const { thumbnail, title, url, description, date } = source.selectors;
    const content = { body: JSON.parse(body) };
    const urlPrefix = source.urlPrefix || '';
    const maxResults = source.max || content.body.length;

    return content.body.slice(0, maxResults).map((item, i) => {
      const struct = _.pickBy({
        thumbnail: (thumbnail) ? _.get(content, `body[${i}]${thumbnail}`) : null,
        title: (title) ? _.get(content, `body[${i}]${title}`) : null,
        url: (url) ? `${urlPrefix}${_.get(content, `body[${i}]${url}`)}` : null,
        description: (description) ? _.get(content, `body[${i}]${description}`) : null,
        date: (date) ? _.get(content, `body[${i}]${date}`) : null
      });

      return struct;
    });
  }
};
