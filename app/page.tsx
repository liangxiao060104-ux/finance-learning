'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import HeatMap from '@/components/HeatMap'
import { getProgress, UserProgress } from '@/lib/storage'
import styles from './page.module.css'

export default function Home() {
  const [progress, setProgress] = useState<UserProgress | null>(null)

  useEffect(() => {
    setProgress(getProgress())
  }, [])

  const totalDays = progress?.totalDays || 0
  const completedTopics = progress?.topics
    ? Object.values(progress.topics).filter((v: any) => v >= 100).length
    : 0
  const avgQuizScore = progress?.quizScores
    ? Object.values(progress.quizScores).reduce((a: any, b: any) => a + b, 0) /
      Object.values(progress.quizScores).length
    : 0

  const quickLinks = [
    { href: '/learn', icon: '📚', label: '开始学习', desc: '掌握7大金融主题' },
    { href: '/simulate', icon: '💹', label: '模拟交易', desc: '10万虚拟资金实战' },
    { href: '/quiz', icon: '✅', label: '知识测验', desc: '检验学习成果' },
    { href: '/calculator', icon: '🧮', label: '理财计算器', desc: '复利贷款轻松算' },
  ]

  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <h1 className={styles.title}>欢迎来到金融学习平台</h1>
        <p className={styles.subtitle}>
          面向大学生的金融知识入门学习网站，通过互动功能将理论知识转化为实践能力
        </p>
      </div>

      <div className={styles.stats}>
        <div className={styles.statCard}>
          <span className={styles.statIcon}>📅</span>
          <div className={styles.statContent}>
            <span className={styles.statValue}>{totalDays}</span>
            <span className={styles.statLabel}>学习天数</span>
          </div>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statIcon}>📖</span>
          <div className={styles.statContent}>
            <span className={styles.statValue}>{completedTopics}/7</span>
            <span className={styles.statLabel}>已完成主题</span>
          </div>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statIcon}>📝</span>
          <div className={styles.statContent}>
            <span className={styles.statValue}>{avgQuizScore ? `${Math.round(avgQuizScore)}%` : '-'}</span>
            <span className={styles.statLabel}>平均测验分</span>
          </div>
        </div>
      </div>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>学习热力图</h2>
        <p className={styles.sectionDesc}>
          记录你每天的学习时光，绿色越深表示学习时间越长
        </p>
        {progress && <HeatMap dailyActivity={progress.dailyActivity || {}} />}
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>快速入口</h2>
        <div className={styles.quickLinks}>
          {quickLinks.map((link) => (
            <Link key={link.href} href={link.href} className={styles.quickLink}>
              <span className={styles.quickLinkIcon}>{link.icon}</span>
              <div className={styles.quickLinkContent}>
                <span className={styles.quickLinkLabel}>{link.label}</span>
                <span className={styles.quickLinkDesc}>{link.desc}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>学习路径</h2>
        <div className={styles.learningPath}>
          <div className={styles.pathItem}>
            <span className={styles.pathNumber}>1</span>
            <div className={styles.pathContent}>
              <h3>货币基础</h3>
              <p>了解货币的职能、流通与货币政策</p>
            </div>
          </div>
          <div className={styles.pathArrow}>↓</div>
          <div className={styles.pathItem}>
            <span className={styles.pathNumber}>2</span>
            <div className={styles.pathContent}>
              <h3>银行存贷</h3>
              <p>学习存款、贷款与利率知识</p>
            </div>
          </div>
          <div className={styles.pathArrow}>↓</div>
          <div className={styles.pathItem}>
            <span className={styles.pathNumber}>3</span>
            <div className={styles.pathContent}>
              <h3>股票入门</h3>
              <p>掌握股票基本概念与交易规则</p>
            </div>
          </div>
          <div className={styles.pathArrow}>↓</div>
          <div className={styles.pathItem}>
            <span className={styles.pathMore}>+4</span>
            <div className={styles.pathContent}>
              <h3>更多主题</h3>
              <p>债券、基金、市场分析、理财规划</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
