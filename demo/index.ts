import { parse, parseJson, parseHtml, parseXml } from "../dist/bundle.esm"
;(async () => {
  console.log(
    "SPA",
    await parseHtml("https://davidwalsh.name/demo/lazyload-2.0.php", {
      selectors: {
        title: {
          selector: ".demo-wrapper table tr .image img",
          attribute: "src",
        },
      },
      spa: {
        enable: true,
        browserConfig: {
          executablePath: "/opt/homebrew/bin/chromium",
        },
      },
    })
  )

  console.log(
    "HTML",
    await parseHtml("https://betomuniz.com", {
      selectors: {
        title: {
          selector: ".dkEYQi .eUVckX",
          attribute: "title",
        },
      },
    })
  )

  console.log(
    "XML",
    await parseXml("https://dev.to/feed/obetomuniz", {
      selectors: {
        title: {
          selector: "//item[1]/title/text()",
        },
      },
    })
  )

  console.log(
    "JSON",
    await parseJson(
      "https://my-json-server.typicode.com/typicode/demo/posts/1",
      {
        selectors: { title: { selector: "title" } },
      }
    )
  )

  console.log(
    "HTML",
    await parse({
      url: "https://betomuniz.com",
      engine: "html",
      options: {
        selectors: { title: { selector: "title" } },
      },
    })
  )

  console.log(
    "XML",
    await parse({
      url: "https://dev.to/feed/obetomuniz",
      engine: "xml",
      options: {
        selectors: { title: { selector: "//item[1]/title/text()" } },
      },
    })
  )

  console.log(
    "JSON",
    await parse({
      url: "https://my-json-server.typicode.com/typicode/demo/posts/1",
      engine: "json",
      options: {
        selectors: { title: { selector: "title" } },
      },
    })
  )
})()
