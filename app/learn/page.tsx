'use client'

import { useEffect, useState } from 'react'
import TopicCard from '@/components/TopicCard'
import { topics } from '@/data/topics'
import { getProgress } from '@/lib/storage'
import styles from './page.module.css'

export default function LearnPage() {
  const [progress, setProgress] = useState<any>(null)

  useEffect(() => {
    setProgress(getProgress())
  }, [])

  const completedCount = progress?.topics
    ? Object.values(progress.topics).filter((v: any) => v >= 100).length
    : 0

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>学习中心</h1>
        <p className={styles.subtitle}>
          7大金融主题，从基础到进阶，系统学习金融知识
        </p>
        <div className={styles.stats}>
          <span>已完成: {completedCount}/7</span>
          <span>总进度: {Math.round((completedCount / 7) * 100)}%</span>
        </div>
      </header>

      <div className={styles.grid}>
        {topics.map((topic) => (
          <TopicCard
            key={topic.id}
            id={topic.id}
            title={topic.title}
            description={topic.description}
            icon={topic.icon}
            progress={progress?.topics?.[topic.id] || 0}
          />
        ))}
      </div>

      <section className={styles.tips}>
        <h2>学习建议</h2>
        <ul>
          <li>建议按顺序学习，从货币基础开始，逐步深入</li>
          <li>每个主题后完成章节测验，检验学习成果</li>
          <li>结合模拟交易，将理论知识转化为实践能力</li>
          <li>定期复习已学内容，强化记忆</li>
        </ul>
      </section>
    </div>
  )
}
