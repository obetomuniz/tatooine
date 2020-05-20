import jsdom from "jsdom"

/**
 * This extract a NodeList using a Query Selector item as root
 *
 * @param {string} html
 * @param {object} node
 * @param {object} options
 * @return {NodeList} // A list of HTMLElement items that match the given Query Selector
 */
export default (html, node, options = {}) => {
  const dom = new jsdom.JSDOM(html, options)
  const doc = dom.window.document
  return doc.querySelectorAll(node.value)
}
