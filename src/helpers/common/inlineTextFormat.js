/**
 * This helper format text when needed removing inconsistences
 *
 * @param {string} text
 * @param {boolean} parse
 * @return {string} Return text parsed/formatted
 */
export default (text, parse) => {
  if (!parse) {
    return text
  }

  let inlineValue = text.replace(/\n|\r/g, "")

  return inlineValue.replace(/\s+/g, " ").trim()
}
