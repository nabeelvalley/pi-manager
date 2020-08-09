import Head from "next/head"
import styles from "../styles/Home.module.css"

export default function AvailableProcessList({ procs }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {procs.map((p, i) => (
          <tr key={i}>
            <td>{p}</td>
            <td>
              <button
                onClick={async () =>
                  await fetch(`/api/process-instance?name=${p}`, {
                    method: "POST",
                  })
                }
              >
                Start
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
