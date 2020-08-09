import Link from 'next/link'
import Head from "next/head"
import styles from "../styles/Home.module.css"

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
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {procs.map((p, i) => (
            <tr key={i}>
              <td>{p.pm_id}</td>
              <td><Link href="/process-instance/[id]" as={`/process-instance/${p.pm_id}`}><a>{p.name}</a></Link></td>
              <td>{p.pm2_env.status}</td>
              <td>
                <button
                  onClick={async () =>
                    await fetch(
                      `/api/process-instance?name=${p.name}`,

                      { method: "POST" }
                    )
                  }
                >
                  Start
                </button>
                <button
                  onClick={async () =>
                    await fetch(`/api/process-instance?id=${p.pm_id}`, {
                      method: "DELETE",
                    })
                  }
                >
                  Stop
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
