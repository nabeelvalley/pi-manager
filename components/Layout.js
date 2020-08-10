import Head from "next/head"
import Link from "next/link"
import styles from "../styles/Layout.module.css"

export default function Layout({ children }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Pi Manager</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <Link href="/">
          <a>
            <h1 className={styles.title}>
              <i className="icofont-home"></i>
              &nbsp;Pi Manager
            </h1>
          </a>
        </Link>
      </header>

      <main className={styles.main}>{children}</main>

      <footer className={styles.footer}>Pi Manager by Nabeel Valley</footer>
    </div>
  )
}
