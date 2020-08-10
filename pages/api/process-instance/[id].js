import { NextApiRequest, NextApiResponse } from "next"
import { get } from "lib/process-instance"
import config from "process.config.json"

/**
 * Restart the pm2 using the default initialization process. Does not return any
 * data, just a status code to indicate success
 * @param {NextApiRequest} req
 * @param {NextApiResponse} res
 */
export default async (req, res) => {
  const {
    query: { id },
    method,
  } = req

  if (!id) {
    res.status(400)
    res.end()
    return
  }

  switch (method) {
    case "GET":
      const proc = await get(id)
      const meta = config.filter((c) => c.name === proc.name)[0]
      res.json({ ...proc, meta })
      break
    default:
      res.status(405)
      res.end()
      break
  }
}
