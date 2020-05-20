import getJSONContent from "./getJSONContent.js"

export default (list, keys) => {
  return list.map((jsonObject) => {
    let source = {}

    for (const key in keys) {
      if (Object.prototype.hasOwnProperty.call(keys, key)) {
        const selector = keys[key]
        const content = getJSONContent(jsonObject, selector)
        if (content) {
          source[key] = content
        }
      }
    }

    return source
  })
}
