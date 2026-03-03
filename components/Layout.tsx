'use client'

import Header from './Header'
import Sidebar from './Sidebar'
import styles from './Layout.module.css'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.layout}>
      <Header />
      <Sidebar />
      <main className={styles.main}>
        <div className={styles.content}>{children}</div>
      </main>
    </div>
  )
}
