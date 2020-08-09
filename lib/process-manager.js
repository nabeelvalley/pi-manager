const pm2 = require("pm2")

/**
 * Startup configuration to use with pm2 process manager
 * @typedef {Object} StartConfig
 * @property {string} name a unique identifier for a process
 * @property {boolean} startup should the script run on startup
 * @property {string} script full or relative path of script to run
 */

/**
 * Runs the pm2 startup with the provided config. Will only start scripts where `startup = true`
 * @param {StartConfig[]} config
 */
const start = async function (config) {
  console.info("starting pm2")

  const apps = config.filter((c) => c.startup)

  const sync = () =>
    new Promise((resolve, reject) => {
      pm2.connect((err) => {
        if (err) reject(err)
        pm2.start(apps, (err, data) => {
          pm2.disconnect()
          err ? reject(err) : resolve(data)
        })
      })
    })

  await sync()
}

/**
 * Kill pm2 instance
 */
const kill = async function () {
  console.info("terminating pm2 instance")
  const sync = () =>
    new Promise((resolve, reject) => {
      pm2.connect((err) => {
        if (err) reject(err)
        pm2.kill((err) => {
          pm2.disconnect()
          err ? reject(err) : resolve()
        })
      })
    })

  await sync()
}


module.exports = {
  start,
  kill
}
