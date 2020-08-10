import Head from "next/head"
import styles from "../styles/Tables.module.css"

export default function AvailableProcessList({ procs }) {
  return (
    <div>
      <h3>Available Processes</h3>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {procs.map((p, i) => (
            <tr key={i}>
              <td>{p}</td>
              <td>
                <div className={styles.buttons}>
                  <button
                    className={styles.green}
                    onClick={async () =>
                      await fetch(`/api/process-instance?name=${p}`, {
                        method: "POST",
                      })
                    }
                  >
                    <i className="icofont-ui-play"></i>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
