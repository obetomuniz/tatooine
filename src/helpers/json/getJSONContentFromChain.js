export default (selector, data) => {
  return selector
    .replace(/\[|\]\.?/g, ".")
    .split(".")
    .filter((s) => s)
    .reduce((acc, val) => acc && acc[val], data)
}
