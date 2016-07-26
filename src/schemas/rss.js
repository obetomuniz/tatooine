import cheerio from 'cheerio';
import _ from 'lodash';

export default {
  type: 'rss',
  schema(body, source) {
    let results = [];
    const { root, thumbnail, title, url, description, date } = source.selectors;
    const $ = cheerio.load(body, { xmlMode: true });
    const currentDocument = $(root);
    const urlPrefix = source.urlPrefix || '';
    const maxResults = source.max || currentDocument.length;

    currentDocument.slice(0, maxResults).each(function () {
      const struct = _.pickBy({
        thumbnail: (thumbnail) ? $(this).find(thumbnail).text() : null,
        title: (title) ? $(this).find(title).text() : null,
        url: (url) ? `${urlPrefix}${$(this).find(url).text()}` : null,
        description: (description) ? $(this).find(description).text() : null,
        date: (date) ? $(this).find(date).text() : null
      });

      results = [...results, struct];
    });

    return results;
  }
};
