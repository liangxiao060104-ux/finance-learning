'use client'

import Link from 'next/link'
import styles from './TopicCard.module.css'

interface TopicCardProps {
  id: string
  title: string
  description: string
  icon: string
  progress: number
}

export default function TopicCard({ id, title, description, icon, progress }: TopicCardProps) {
  return (
    <Link href={`/learn/${id}`} className={styles.card}>
      <div className={styles.icon}>{icon}</div>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
        <div className={styles.progress}>
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className={styles.progressText}>
            {progress >= 100 ? '已完成' : `${progress}%`}
          </span>
        </div>
      </div>
    </Link>
  )
}
