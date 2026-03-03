'use client'

import { useTheme } from '@/lib/theme'
import styles from './ThemeSwitcher.module.css'

const themes = [
  { id: 'dark', name: '深色', icon: '🌙', color: '#0d1117' },
  { id: 'light', name: '浅色', icon: '☀️', color: '#ffffff' },
  { id: 'blue', name: '蓝色', icon: '🔵', color: '#1f6feb' },
  { id: 'green', name: '绿色', icon: '🟢', color: '#238636' },
] as const

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()

  return (
    <div className={styles.container}>
      <button
        className={styles.trigger}
        onClick={() => {
          const currentIndex = themes.findIndex((t) => t.id === theme)
          const nextIndex = (currentIndex + 1) % themes.length
          setTheme(themes[nextIndex].id)
        }}
        title={`当前: ${themes.find((t) => t.id === theme)?.name}`}
      >
        {themes.find((t) => t.id === theme)?.icon}
      </button>
      <div className={styles.dropdown}>
        {themes.map((t) => (
          <button
            key={t.id}
            className={`${styles.option} ${theme === t.id ? styles.active : ''}`}
            onClick={() => setTheme(t.id)}
          >
            <span className={styles.optionIcon}>{t.icon}</span>
            <span className={styles.optionName}>{t.name}</span>
            <span
              className={styles.optionColor}
              style={{ backgroundColor: t.color }}
            />
          </button>
        ))}
      </div>
    </div>
  )
}
