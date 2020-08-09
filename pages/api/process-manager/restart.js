import { NextApiRequest, NextApiResponse } from "next"
import { start, kill } from "lib/process-manager"
import config from "process.config.json"

/**
 * Restart the pm2 using the default initialization process. Does not return any
 * data, just a status code to indicate success
 * @param {NextApiRequest} req 
 * @param {NextApiResponse} res 
 */
export default async (req, res) => {
  await kill()
  await start(config)

  res.status(200)
  res.end()
}
