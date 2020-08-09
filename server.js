const { createServer } = require("http")
const { parse } = require("url")
const next = require("next")
const { start, kill } = require("./lib/process-manager")
const processConfig = require("./process.config.json")

const isDev = process.env.NODE_ENV !== "production"
const port = process.env.PORT || 3000

const app = next({ dev: isDev })
const handle = app.getRequestHandler()

const main = async () => {
  await start(processConfig)

  // Base Server from Documentation: https://nextjs.org/docs/advanced-features/custom-server
  app.prepare().then(() => {
    createServer((req, res) => {
      // Be sure to pass `true` as the second argument to `url.parse`.
      // This tells it to parse the query portion of the URL.
      const parsedUrl = parse(req.url, true)

      handle(req, res, parsedUrl)
    }).listen(port, (err) => {
      if (err) throw err
      console.log(`> Ready on port ${port}`)
    })
  })
}

main()