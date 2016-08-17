import cheerio from 'cheerio';

export default {
  type: 'customschema', // [required] It will connect your custom schema with you custom source.
  schema(body, source) { // [required] [parameters: body and source] Here you'll be able to create the logic of your schema.
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

    // This schema should return 5 results from a source and each one will have a image and a title.
    return results;
  }
};
