import Head from "next/head"
import Layout from "components/Layout"
import styles from "../styles/Home.module.css"
import useSWR from "swr"

import RegisteredProcessList from "components/RegisteredProcessList"
import AvailableProcessList from "components/AvailableProcessList"

export default function Home() {
  const { data, error } = useSWR(
    "/api/process-instance",
    async (url) => {
      const res = await fetch(url)
      return await res.json()
    },
    {
      refreshInterval: 2,
    }
  )
  if (error) console.error(error)

  return (
    <Layout>
      {error ? (
        <p>Error while loading data</p>
      ) : data ? (
        <div className={styles.stats}>
          <AvailableProcessList procs={data.available} />
          <RegisteredProcessList procs={data.registered} />
        </div>
      ) : (
        <p>Loading ...</p>
      )}
    </Layout>
  )
}
