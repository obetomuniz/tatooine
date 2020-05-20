/**
 * This create a result object and allows transform the given data returned.
 *
 * @param {object} result
 * @param {Function} fork
 * @return {object} Return the final result
 */
export default (result, fork) => {
  return fork ? { ...result, ...fork(result) } : result
}
