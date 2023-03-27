# Transformer Plugins

Tatooine's Transformer Plugins The current plugin allows plugins developers to access internal events to prepare, pre process and post process data.

## Plugin Scaffolding

```typescript
import { PluginType, ITransformerPlugin, TScrapedData, EngineType,  } from "tatooine"

const plugin: ITransformerPlugin = {
  type: PluginType.Transformer,

  supportedEngines: [EngineType.Html]

  onInit(options: { selectors: TSelectors }): void => {
  }

  onPreProcess(data: string): string {
  },

  onPostProcess(data: TScrapedData): TScrapedData {
  },
}

export default plugin
```

## API

#### `type: PluginType.Transformer`

A property that specifies the type of the plugin.

#### `supportedEngines: EngineType[]`

A property that specifies the engines supported by the plugin.

#### `onInit(options: { selectors: TSelectors }): void`

A method that is called once before processing any data.

#### `onPreProcess(data: string): string`

A method that is called for each input before processing it.

#### `onPostProcess(data: TScrapedData): TScrapedData`

A method that is called after built-in Tatooine's apply its data structure.
