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
    method
  } = req
  
  switch (method) {
    case "GET":
      res.json(await get(id))
      break
    default:
      res.status(405)
      res.end()
      break
  }
}
