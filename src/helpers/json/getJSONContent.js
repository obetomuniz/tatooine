import getJSONContentFromChain from "./getJSONContentFromChain.js"

export default (jsonObject, selector) => {
  const { value, prefix = "", suffix = "" } = selector
  const content = getJSONContentFromChain(value, jsonObject)

  if (content) {
    return `${prefix}${content}${suffix}`
  }

  return null
}
