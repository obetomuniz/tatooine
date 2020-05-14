import inlineTextFormat from "./inlineTextFormat.js"

/**
 * This extract content from a HTMLElement node
 *
 * @param {HTMLElement} node
 * @param {object} selector
 * @return {string} Return content
 */
export default (node, selector) => {
  const { value, attribute, prefix = "", suffix = "", inline = true } = selector
  const el = node.querySelector(value)
  if (attribute) {
    if (el) {
      return `${prefix}${inlineTextFormat(
        el.getAttribute(attribute),
        inline
      )}${suffix}`
    } else {
      return null
    }
  }

  if (el) {
    return `${prefix}${inlineTextFormat(el.textContent, inline)}${suffix}`
  }

  return null
}
