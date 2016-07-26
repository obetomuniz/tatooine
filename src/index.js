import request from 'request';
import async from 'async';
import defaultSchemas from './schemas';

export default class Tatooine {
  constructor(resources, callback, options = { schemas: [] }) {
    this.options = options;
    this.responseBuilder = this.responseBuilder.bind(this);

    async.map(resources, this.responseBuilder, (error, response) => {
      if (error) return console.log(error);
      return callback(response);
    });
  }

  responseBuilder(source, callback) {
    const src = source;

    request(src.requestOptions, (error, response, body) => {
      let schemas;
      if (!error && response.statusCode === 200) {
        schemas = this.options.schemas.concat(defaultSchemas);

        for (let i = 0; i < schemas.length; i++) {
          if (schemas[i].type === src.type) {
            src.results = schemas[i].schema(body, src);
          }
        }
      }

      callback(error, src);
    });
  }
}
