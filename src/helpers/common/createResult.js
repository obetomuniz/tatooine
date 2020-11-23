/**
 * This create a result object and allows transform the given data returned.
 *
 * @param {object} result
 * @param {Function} fork
 * @return {object} Return the final result
 */
export default async (result, fork) => {
  if (fork) {
    const forkedResult = await fork(result)
    return { ...result, ...forkedResult }
  }

  return result
}
