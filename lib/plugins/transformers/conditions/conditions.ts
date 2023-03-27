import { OperatorFn, Operators } from "./types"

const operators: Operators = {
  difference: (a: string, b: string, sensitive: boolean) =>
    sensitive ? a !== b : a.toLowerCase() !== b.toLowerCase(),
  equal: (a: string, b: string, sensitive: boolean) =>
    sensitive ? a === b : a.toLowerCase() === b.toLowerCase(),
  contains: (a: string, b: string, sensitive: boolean) =>
    sensitive ? a.includes(b) : a.toLowerCase().includes(b.toLowerCase()),
  regex: (a: string, b: string, sensitive: boolean) =>
    new RegExp(b, sensitive ? "" : "i").test(a),
}

export const applyConditions = (value: string, conditions: any[]): boolean => {
  return conditions.every((condition) => {
    const operation: OperatorFn | undefined = operators[condition.operation]
    return operation
      ? operation(value, condition.value, condition.sensitive || false)
      : false
  })
}
