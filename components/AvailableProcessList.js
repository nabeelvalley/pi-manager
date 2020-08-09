import Head from "next/head"
import styles from "../styles/Home.module.css"

export default function AvailableProcessList({ procs }) {
  return (
    <div>
      {procs.map((p,i) => (
        <p key={i}> {p} </p>
      ))}
    </div>
  )
}
