import cheerio from 'cheerio';
import _ from 'lodash';

export default {
  type: 'web-scraping',
  schema(body, source) {
    let results = [];
    const { root, thumbnail, title, url, description, date } = source.selectors;
    const $ = cheerio.load(body);
    const currentDocument = $(root);
    const urlPrefix = source.urlPrefix || '';
    const maxResults = source.max || currentDocument.length;

    currentDocument.each(function () {
      const struct = _.pickBy({
        thumbnail: (thumbnail) ? $(this).find(thumbnail).attr('src') : null,
        title: (title) ? $(this).find(title).text().trim() : null,
        url: (url) ? `${urlPrefix}${$(this).find(url).attr('href')}` : null,
        description: (description) ? $(this).find(description).text() : null,
        date: (date) ? $(this).find(date).text() : null
      });

      results = [...results, struct];
    });

    if (source.filter && source.filter.field && source.filter.query) {
      results = results.filter((k) => k[source.filter.field].indexOf(source.filter.query) > 0);
    }

    return results.slice(0, maxResults);
  }
};
