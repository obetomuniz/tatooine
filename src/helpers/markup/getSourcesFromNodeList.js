import getNodeContent from "./getNodeContent.js"

/**
 * This extract sources from a given NodeList of HTMLElement items
 *
 * @param {NodeList} nodeList
 * @param {object} keys
 * @return {Array} Return a list of sources mapped
 */
export default (nodeList, keys) => {
  let sources = []

  nodeList.forEach((node) => {
    let source = {}

    for (const key in keys) {
      if (Object.prototype.hasOwnProperty.call(keys, key)) {
        const selector = keys[key]
        const content = getNodeContent(node, selector)

        if (content) {
          source[key] = content
        }
      }
    }
    sources = [...sources, source]
  })

  return sources
}
