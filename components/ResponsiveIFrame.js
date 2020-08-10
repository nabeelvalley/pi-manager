import Link from "next/link"
import Head from "next/head"

import ProcessStatus from "./ProcessStatus"

import styles from "../styles/IFrame.module.css"

/**
 * Process description used by
 * @typedef {import('pm2').ProcessDescription} ProcessDescription
 */

/**
 *
 * @param {{
 *  url: string
 * }} props
 */
export default function ResponsiveIFrame({ url }) {
  return <iframe className={styles.iframe} src={url} allowfullscreen></iframe>
}
