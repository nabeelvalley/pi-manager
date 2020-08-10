import Link from "next/link"
import Head from "next/head"

import ProcessStatus from "./ProcessStatus"

import styles from "../styles/Tables.module.css"

/**
 * Process description used by
 * @typedef {import('pm2').ProcessDescription} ProcessDescription
 */

/**
 *
 * @param {{
 *  procs: ProcessDescription[]
 * }} props
 */
export default function RegisteredProcessList({ procs }) {
  return (
    <div>
      <h3>Registered Processes</h3>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {procs.map((p, i) => (
            <tr key={i}>
              <td>{p.pm_id}</td>
              <td>
                <Link
                  href="/process-instance/[id]"
                  as={`/process-instance/${p.pm_id}`}
                >
                  <a>{p.name}</a>
                </Link>
              </td>
              <td>
                <ProcessStatus status={p.pm2_env.status} />
              </td>
              <td>
                <div className={styles.buttons}>
                  <button
                    className={styles.green}
                    onClick={async () =>
                      await fetch(`/api/process-instance?name=${p.name}`, {
                        method: "POST",
                      })
                    }
                  >
                    <i className="icofont-ui-play"></i>
                  </button>
                  <button
                    className={styles.red}
                    onClick={async () =>
                      await fetch(`/api/process-instance?id=${p.pm_id}`, {
                        method: "DELETE",
                      })
                    }
                  >
                    <i className="icofont-square"></i>
                  </button>
                  <Link
                    href="/process-instance/[id]"
                    as={`/process-instance/${p.pm_id}`}
                  >
                    <a className="button">
                      <i className="icofont-page"></i>
                    </a>
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
