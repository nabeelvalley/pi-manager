import { useRouter } from "next/router"
import Layout from "components/Layout"
import useSWR from "swr"

import styles from "styles/ProcessDetail.module.css"

import RegisteredProcessList from "components/RegisteredProcessList"
import ResponsiveIFrame from "components/ResponsiveIFrame"

export default function Home() {
  const router = useRouter()

  const id = router.query.id

  const { data, error } = useSWR(
    `/api/process-instance/${id || ""}`,
    async (url) => {
      const res = await fetch(url)
      return await res.json()
    },
    {
      refreshInterval: 5,
    }
  )

  if (error) console.error(error)

  return (
    <Layout>
      {error ? (
        <p>Error while loading data</p>
      ) : data ? (
        <>
          <h2>{data.name}</h2>
          <RegisteredProcessList procs={[data]} />
          <h3>Logs</h3>
          <div className={styles.logs}>
            {data.logs.map((l, i) => (
              <div key={i} className="code">
                {l}
              </div>
            ))}
          </div>
          {data.meta && data.meta.port ? (
            <>
              <h3>Preview</h3>
              <ResponsiveIFrame
                url={`http://${window.location.hostname}:${data.meta.port}`}
              />
            </>
          ) : null}
        </>
      ) : (
        <p>Loading ...</p>
      )}
    </Layout>
  )
}
