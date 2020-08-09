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
          </tr>
        </thead>
        <tbody>
          {procs.map((p, i) => (
            <tr key={i}>
              <td>{p.pm_id}</td>
              <td>{p.name}</td>
              <td>{p.pm2_env.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
