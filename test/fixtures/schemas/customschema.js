import cheerio from 'cheerio';

export default {
  type: 'customschema',
  schema(body, source) {
    let results = [];
    const { root, image, title } = source.selectors;
    const $ = cheerio.load(body);

    $(root).slice(0, 5).each(function () {
      const struct = {
        image: (image) ? $(this).find(image).attr('src') : null,
        title: (title) ? $(this).find(title).text().trim() : null
      };

      results = [...results, struct];
    });

    return results;
  }
};
