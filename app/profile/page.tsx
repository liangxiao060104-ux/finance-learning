'use client'

import { useState, useEffect } from 'react'
import { topics } from '@/data/topics'
import { getProgress, getSimulateData, getLibrary, UserProgress, SimulateData, CollectionItem } from '@/lib/storage'
import styles from './page.module.css'

export default function ProfilePage() {
  const [progress, setProgress] = useState<UserProgress | null>(null)
  const [simulateData, setSimulateData] = useState<SimulateData | null>(null)
  const [library, setLibrary] = useState<CollectionItem[]>([])

  useEffect(() => {
    setProgress(getProgress())
    setSimulateData(getSimulateData())
    setLibrary(getLibrary())
  }, [])

  // 计算等级
  const getLevel = () => {
    if (!progress) return { level: '金融新手', nextLevel: '入门', progress: 0 }

    const completedTopics = progress.topics
      ? Object.values(progress.topics).filter((v: any) => v >= 100).length
      : 0

    if (completedTopics >= 6) return { level: '金融精通', nextLevel: null, progress: 100 }
    if (completedTopics >= 4) return { level: '进阶学习', nextLevel: '精通', progress: (completedTopics - 4) / 2 * 100 }
    if (completedTopics >= 2) return { level: '入门学习', nextLevel: '进阶', progress: (completedTopics - 2) / 2 * 100 }
    return { level: '金融新手', nextLevel: '入门', progress: completedTopics / 2 * 100 }
  }

  const level = getLevel()

  // 计算统计数据
  const totalDays = progress?.totalDays || 0
  const completedTopics = progress?.topics
    ? Object.values(progress.topics).filter((v: any) => v >= 100).length
    : 0
  const avgQuizScore = progress?.quizScores
    ? Object.values(progress.quizScores).reduce((a: any, b: any) => a + b, 0) /
      Object.values(progress.quizScores).length
    : 0

  // 模拟交易统计
  const balance = simulateData?.balance || 100000
  const holdings = simulateData?.holdings || {}
  const totalAssets = balance + Object.entries(holdings).reduce((sum: number, [_, data]: [string, any]) => {
    // 这里简化计算，实际应该用当前股价
    return sum + data.quantity * data.avgPrice
  }, 0)
  const totalProfit = totalAssets - 100000
  const profitPercent = (totalProfit / 100000) * 100

  // 收藏统计
  const collectionCount = library.length || 0

  // 已学知识点列表
  const learnedTopics = topics.filter(
    (topic) => {
      const topicProgress = progress?.topics?.[topic.id]
      return topicProgress !== undefined && topicProgress >= 100
    }
  )

  const handleExportKnowledge = () => {
    const content = `
# 金融学习知识点清单

## 学习进度
- 已完成主题: ${completedTopics}/7
- 总学习天数: ${totalDays}天
- 平均测验分数: ${avgQuizScore ? Math.round(avgQuizScore) + '%' : '-'}

## 已学主题
${learnedTopics.map((t) => `- ${t.icon} ${t.title}: ${t.description}`).join('\n')}

## 模拟交易
- 总资产: ¥${totalAssets.toLocaleString()}
- 收益率: ${profitPercent >= 0 ? '+' : ''}${profitPercent.toFixed(2)}%

---
生成时间: ${new Date().toLocaleString('zh-CN')}
    `.trim()

    // 创建下载
    const blob = new Blob([content], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = '金融学习知识点清单.md'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>个人中心</h1>
        <p className={styles.subtitle}>查看学习进度和统计数据</p>
      </header>

      <div className={styles.levelCard}>
        <div className={styles.levelInfo}>
          <span className={styles.levelIcon}>🏆</span>
          <div>
            <h2 className={styles.levelTitle}>{level.level}</h2>
            {level.nextLevel && (
              <p className={styles.levelNext}>下一级: {level.nextLevel}</p>
            )}
          </div>
        </div>
        {level.nextLevel && (
          <div className={styles.levelProgress}>
            <div className={styles.progressBar}>
              <div
                className={styles.progressFill}
                style={{ width: `${level.progress}%` }}
              />
            </div>
            <span>{Math.round(level.progress)}%</span>
          </div>
        )}
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
            <span className={styles.statValue}>
              {avgQuizScore ? Math.round(avgQuizScore) + '%' : '-'}
            </span>
            <span className={styles.statLabel}>平均测验分</span>
          </div>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statIcon}>📁</span>
          <div className={styles.statContent}>
            <span className={styles.statValue}>{collectionCount}</span>
            <span className={styles.statLabel}>收藏数量</span>
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <h2>模拟交易收益</h2>
        <div className={styles.tradingStats}>
          <div className={styles.tradingCard}>
            <span>总资产</span>
            <span className={styles.tradingValue}>
              ¥{totalAssets.toLocaleString()}
            </span>
          </div>
          <div className={styles.tradingCard}>
            <span>可用资金</span>
            <span className={styles.tradingValue}>
              ¥{balance.toLocaleString()}
            </span>
          </div>
          <div className={styles.tradingCard}>
            <span>收益率</span>
            <span
              className={`${styles.tradingValue} ${
                profitPercent >= 0 ? styles.positive : styles.negative
              }`}
            >
              {profitPercent >= 0 ? '+' : ''}
              {profitPercent.toFixed(2)}%
            </span>
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <h2>知识点清单</h2>
        {learnedTopics.length === 0 ? (
          <p className={styles.emptyText}>暂无已学知识点</p>
        ) : (
          <div className={styles.topicList}>
            {learnedTopics.map((topic) => (
              <div key={topic.id} className={styles.topicItem}>
                <span className={styles.topicIcon}>{topic.icon}</span>
                <div className={styles.topicInfo}>
                  <span className={styles.topicTitle}>{topic.title}</span>
                  <span className={styles.topicDesc}>{topic.description}</span>
                </div>
              </div>
            ))}
          </div>
        )}
        <button onClick={handleExportKnowledge} className="btn-primary">
          导出知识点清单
        </button>
      </div>
    </div>
  )
}
