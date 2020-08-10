import { NextApiRequest, NextApiResponse } from "next"
import { getAll, start, stop, del } from "lib/process-instance"
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

  const current = config.filter((c) => c.name === name)[0]

  switch (method) {
    case "GET":
      const registeredProcs = await getAll()
      res.json({
        registered: registeredProcs.map((p) => {
          const meta = config.filter((c) => c.name === p.name)[0]
          return { ...p, meta }
        }),
        available: config.map((c) => c.name),
      })
      break
    case "POST":
      res.json(await start(current))
      break
    case "PUT":
      res.json(await stop(id))
      break
    case "DELETE":
      res.json(await del(id))
      break
    default:
      res.status(405)
      res.end()
      break
  }
}
