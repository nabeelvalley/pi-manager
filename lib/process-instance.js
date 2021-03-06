const pm2 = require("pm2")
const fs = require("fs")

/**
 * Process description used by
 * @typedef {import('pm2').ProcessDescription} ProcessDescription
 */

/**
 * Process description used by
 * @typedef {import('pm2').Proc} Proc
 */

/**
 * Startup configuration to use with pm2 process manager
 * @typedef {Object} AppConfig
 * @property {string} name a unique identifier for a process
 * @property {string} script full or relative path of script to run
 */

/**
 * Start an instance of a pm2 service defined in the `process.config.js`
 * @param {AppConfig} app
 * @returns {Proc[]}
 */
const start = async function (app) {
  console.info(`starting app name:${app.name}`)

  const sync = () =>
    new Promise((resolve, reject) => {
      pm2.connect((err) => {
        if (err) reject(err)
        pm2.start(app, (err, data) => {
          pm2.disconnect()
          err ? reject(err) : resolve(data)
        })
      })
    })

  /** @type {Proc[]} */
  const procs = await sync()
  const sanitized = procs.map(sanitizeEnv)

  return procs
}

/**
* Stop pm2 instance of process with given id
 * @param {string|number} id
 */
const stop = async function (id) {
  console.info(`stopping process instance: ${id}`)

  const sync = () =>
    new Promise((resolve, reject) => {
      pm2.connect((err) => {
        if (err) reject(err)
        pm2.stop(id, (err, data) => {
          pm2.disconnect()
          err ? reject(err) : resolve(data)
        })
      })
    })

  /** @type {Proc[]} */
  const procs = await sync()
  const sanitized = procs.map(sanitizeEnv)

  return sanitized
}
/**
 * Kill pm2 instance of process with given id
 * @param {string|number} id
 */
const del = async function (id) {
  console.info(`deleting process instance: ${id}`)

  const sync = () =>
    new Promise((resolve, reject) => {
      pm2.connect((err) => {
        if (err) reject(err)
        pm2.delete(id, (err, data) => {
          pm2.disconnect()
          err ? reject(err) : resolve(data)
        })
      })
    })

  /** @type {Proc[]} */
  const procs = await sync()
  const sanitized = procs.map(sanitizeEnv)

  return sanitized
}

/**
 * Restart a pm2 process with the given id or name
 * @param {string|number} key id or name
 */
const restart = async function (key) {
  console.info(`restart process id:${id}`)

  const sync = () =>
    new Promise((resolve, reject) => {
      pm2.connect((err) => {
        if (err) reject(err)
        pm2.restart(id, (err, data) => {
          pm2.disconnect()
          err ? reject(err) : resolve(data)
        })
      })
    })

  await sync()
}

/**
 * Get all pm2 process instance descriptions
 * @returns {Promise<ProcessDescription[]>}
 */
const getAll = async function () {
  console.info("get all process instances")

  /** @type {Promise<ProcessDescription[]>} */
  const sync = () =>
    new Promise((resolve, reject) => {
      pm2.connect((err) => {
        if (err) reject(err)
        pm2.list((err, data) => {
          pm2.disconnect()
          err ? reject(err) : resolve(data)
        })
      })
    })

  /** @type {ProcessDescription[]} */
  const procs = await sync()
  const sanitized = procs.map(sanitizeEnv)

  return sanitized
}

/**
 * Get a pm2 process with the given id or name with its logs
 * @param {string|number} key id or name
 */
const get = async function (id) {
  console.info(`get process instance: ${id}`)

  /** @type {Promise<ProcessDescription[]>} */
  const sync = () =>
    new Promise((resolve, reject) => {
      pm2.connect((err) => {
        if (err) reject(err)
        pm2.list((err, data) => {
          pm2.disconnect()
          err ? reject(err) : resolve(data)
        })
      })
    })

  /** @type {ProcessDescription} */
  const procs = await sync()
  const app = procs.find((p) => p.pm_id == id)

  const logpath = app.pm2_env.pm_out_log_path

  const fileSync = () =>
    new Promise((resolve, reject) => {
      fs.readFile(logpath, "utf8", (err, data) => {
        if (err) reject(err)
        else resolve(data)
      })
    })

  const logs = (await fileSync()).split("\n")

  const sanitized = {
    ...sanitizeEnv(app),
    logs: logs.slice(logs.length - 50),
  }

  return sanitized
}

/**
 * Remove the local machine env from the proc
 * @param {ProcessDescription} proc
 */
const sanitizeEnv = (proc) => {
  if (proc && proc.pm2_env)
    proc.pm2_env = {
      instances: proc.pm2_env.instances,
      status: proc.pm2_env.status,
    }

  return proc
}

module.exports = {
  start,
  stop,
  del,
  restart,
  get,
  getAll,
}
