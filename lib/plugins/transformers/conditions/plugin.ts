import { ITransformerPlugin, TScrapedData } from "../../../types"
import { ConditionPluginType } from "./types"
import { applyConditions } from "./conditions"

const plugin = (conditions: ConditionPluginType): ITransformerPlugin => ({
  type: "transformer",

  supportedEngines: ["all"],

  onPostProcess(data: TScrapedData): TScrapedData {
    const newData: TScrapedData = {}

    for (const [key, value] of Object.entries(data)) {
      if (conditions[key]) {
        if (Array.isArray(value)) {
          newData[key] = value.filter((v) =>
            applyConditions(v, conditions[key])
          )
          newData[key] =
            newData[key]?.length === 1 ? newData[key][0] : newData[key]
        } else {
          newData[key] = applyConditions(value, conditions[key]) ? value : null
        }
      } else {
        newData[key] = value
      }
    }

    return newData
  },
})

export default plugin
