import nodesTatooine from "./engines/nodes.js"
import JSONTatooine from "./engines/json.js"

/**
 * @param {Array<object>} schemas A list of schemas following the default and/or custom engines registered.
 * @param {Array<Promise>} customEngines A list of custom engines to be registered.
 * @return {Promise} Returns a promise with data sources.
 */
function Tatooine(schemas, customEngines = []) {
  const engines = [JSONTatooine, nodesTatooine, ...customEngines]
  let sources = []

  schemas.map((schema) => {
    engines.forEach(({ engine, process }) => {
      if (engine === schema.engine) {
        sources = [...sources, process(schema)]
      }
    })
  })

  return Promise.all(sources)
}

export default Tatooine
