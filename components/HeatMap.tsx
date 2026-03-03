'use client'

import { useEffect, useState } from 'react'
import styles from './HeatMap.module.css'

interface HeatMapProps {
  dailyActivity: Record<string, number>
}

export default function HeatMap({ dailyActivity }: HeatMapProps) {
  const [weeks, setWeeks] = useState<string[][]>([])

  useEffect(() => {
    const generateWeeks = () => {
      const today = new Date()
      const weeksData: string[][] = []
      const activityMap = new Map(Object.entries(dailyActivity))

      // 从一年前开始
      const startDate = new Date(today)
      startDate.setFullYear(startDate.getFullYear() - 1)

      // 调整到周日
      const dayOfWeek = startDate.getDay()
      startDate.setDate(startDate.getDate() - dayOfWeek)

      let currentWeek: string[] = []
      const current = new Date(startDate)

      while (current <= today) {
        const dateStr = current.toISOString().split('T')[0]
        const minutes = activityMap.get(dateStr) || 0
        currentWeek.push(dateStr)

        if (currentWeek.length === 7) {
          weeksData.push(currentWeek)
          currentWeek = []
        }

        current.setDate(current.getDate() + 1)
      }

      // 添加最后一周
      if (currentWeek.length > 0) {
        weeksData.push(currentWeek)
      }

      setWeeks(weeksData)
    }

    generateWeeks()
  }, [dailyActivity])

  const getLevel = (dateStr: string): number => {
    const minutes = dailyActivity[dateStr] || 0
    if (minutes === 0) return 0
    if (minutes < 15) return 1
    if (minutes < 30) return 2
    if (minutes < 60) return 3
    return 4
  }

  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('zh-CN', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className={styles.week}>
            {week.map((dateStr, dayIndex) => {
              const level = getLevel(dateStr)
              const minutes = dailyActivity[dateStr] || 0
              return (
                <div
                  key={dateStr}
                  className={`${styles.day} ${level > 0 ? styles[`level${level}`] : ''}`}
                  title={`${formatDate(dateStr)}: ${minutes} 分钟`}
                />
              )
            })}
          </div>
        ))}
      </div>
      <div className={styles.legend}>
        <span className={styles.legendLabel}>少</span>
        <div className={`${styles.day} ${styles.level0}`} />
        <div className={`${styles.day} ${styles.level1}`} />
        <div className={`${styles.day} ${styles.level2}`} />
        <div className={`${styles.day} ${styles.level3}`} />
        <div className={`${styles.day} ${styles.level4}`} />
        <span className={styles.legendLabel}>多</span>
      </div>
    </div>
  )
}
