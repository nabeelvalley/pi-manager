import { NextApiRequest, NextApiResponse } from "next"
import { getAll, start, stop } from "lib/process-instance"
import config from "process.config.json"

/**
 * Restart the pm2 using the default initialization process. Does not return any
 * data, just a status code to indicate success
 * @param {NextApiRequest} req
 * @param {NextApiResponse} res
 */
export default async (req, res) => {
  const {
    query: { id, name },
    method,
  } = req

  console.log({id, name, method})

  const current = config.filter((c) => c.name === name)[0]

  switch (method) {
    case "GET":
      res.json({
        registered: await getAll(),
        available: config.map((c) => c.name),
      })
      break
    case "POST":
      res.json(await start(current))
      break
    case "DELETE":
      res.json(await stop(id))
    default:
      res.status(405)
      res.end()
      break
  }
}
