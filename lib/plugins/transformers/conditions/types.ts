export type OperatorFn = (a: string, b: string, sensitive: boolean) => boolean

export type Operators = {
  [key: string]: OperatorFn
}

export enum ConditionOperationType {
  Difference = "difference",
  Equal = "equal",
  Contains = "contains",
  Regex = "regex",
}

export type ConditionOperationTypes =
  | "difference"
  | "equal"
  | "contains"
  | "regex"

export interface ConditionType {
  value: string
  operation: ConditionOperationType | ConditionOperationTypes
  sensitive?: boolean
}

export interface ConditionPluginType extends Record<string, ConditionType[]> {}
