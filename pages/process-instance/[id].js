import { useRouter } from "next/router"
import Layout from "components/Layout"
import useSWR from "swr"

import RegisteredProcessList from "components/RegisteredProcessList"
import AvailableProcessList from "components/AvailableProcessList"

export default function Home() {
  const router = useRouter()

  const id = router.query.id

  const { data, error } = useSWR(
    `/api/process-instance/${id}`,
    async (url) => {
      const res = await fetch(url)
      return await res.json()
    },
    {
      refreshInterval: 5,
    }
  )

  console.log(data)

  if (error) console.error(error)

  return (
    <Layout>
      <h1>Process Overview</h1>
      {error ? (
        <p>Error while loading data</p>
      ) : data ? (
        <>
          <h2>{data.name}</h2>
          <RegisteredProcessList procs={[data]} />
          <h3>Logs</h3>
          <div>
            {data.logs.map((l, i) => (
              <div key={i}> {l} </div>
            ))}
          </div>
        </>
      ) : (
        <p>Loading ...</p>
      )}
    </Layout>
  )
}
