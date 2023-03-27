# Engine Plugins

This module defines an engine plugin for scraping using the "tatooine" plugin ecosystem.

Use `registerEnginePlugin` to register the plugin engine alongside with others built-in engines.

## Plugin Scaffolding

```typescript
import axios from "axios"
import {
  IEnginePlugin,
  TScrapedDataPromise,
  registerEnginePlugin,
} from "tatooine"

const customEnginePlugin: IEnginePlugin<"custom"> = {
  type: "engine",
  engine: "custom",
  scrape: async (
    url: string,
    { selectors, request, plugins = [] }: any
  ): TScrapedDataPromise => {
    const { data } = await axios.get(url, request)

    console.log("data", data)
    console.log("selectors", selectors)
    console.log("plugins", plugins)

    return {}
  },
}

registerEnginePlugin(customEnginePlugin)
```

## API

#### `type: PluginType.Engine`

A property that specifies the type of the plugin.

#### `engine: T`

A property that specifies the custom engine name for the plugin.

#### `scrape(url: string, options: TScrapeDefaultOptions): TScrapedData | TScrapedDataPromise`

A method that expected a resource address with the specified options. It returns a promise that resolves the scraped data.
