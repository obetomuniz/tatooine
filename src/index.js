import markupEngine from "./engines/markup.js"
import JSONEngine from "./engines/json.js"

/**
 * @param {Array<object>} schemas A list of schemas following the default and/or custom engines registered.
 * @param {Array<Promise>} customEngines A list of custom engines to be registered.
 * @return {Promise} Returns a promise with data sources.
 */
const Tatooine = (schemas, customEngines = []) => {
  const engines = [JSONEngine, markupEngine, ...customEngines]
  let sources = []

  schemas.map((schema) => {
    engines.forEach(({ engine, run }) => {
      if (engine === schema.engine) {
        sources = [...sources, run(schema)]
      }
    })
  })

  return Promise.all(sources)
}

export default Tatooine
