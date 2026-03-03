'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type Theme = 'dark' | 'light' | 'blue' | 'green'

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

const THEME_KEY = 'finance_platform_theme'

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('dark')

  useEffect(() => {
    // 从 localStorage 读取主题
    const savedTheme = localStorage.getItem(THEME_KEY) as Theme | null
    if (savedTheme) {
      setThemeState(savedTheme)
      applyTheme(savedTheme)
    }
  }, [])

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
    localStorage.setItem(THEME_KEY, newTheme)
    applyTheme(newTheme)
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}

function applyTheme(theme: Theme) {
  const root = document.documentElement

  // 重置所有主题变量
  root.classList.remove('theme-dark', 'theme-light', 'theme-blue', 'theme-green')
  root.classList.add(`theme-${theme}`)

  // 设置 CSS 变量
  switch (theme) {
    case 'dark':
      root.style.setProperty('--bg-primary', '#0d1117')
      root.style.setProperty('--bg-secondary', '#161b22')
      root.style.setProperty('--bg-tertiary', '#21262d')
      root.style.setProperty('--border', '#30363d')
      root.style.setProperty('--text-primary', '#c9d1d9')
      root.style.setProperty('--text-secondary', '#8b949e')
      break
    case 'light':
      root.style.setProperty('--bg-primary', '#ffffff')
      root.style.setProperty('--bg-secondary', '#f6f8fa')
      root.style.setProperty('--bg-tertiary', '#eaeef2')
      root.style.setProperty('--border', '#d0d7de')
      root.style.setProperty('--text-primary', '#1f2328')
      root.style.setProperty('--text-secondary', '#656d76')
      break
    case 'blue':
      root.style.setProperty('--bg-primary', '#0d1117')
      root.style.setProperty('--bg-secondary', '#161b22')
      root.style.setProperty('--bg-tertiary', '#21262d')
      root.style.setProperty('--border', '#30363d')
      root.style.setProperty('--text-primary', '#c9d1d9')
      root.style.setProperty('--text-secondary', '#8b949e')
      root.style.setProperty('--accent-green', '#1f6feb')
      root.style.setProperty('--accent-green-light', '#58a6ff')
      break
    case 'green':
      root.style.setProperty('--bg-primary', '#0d1117')
      root.style.setProperty('--bg-secondary', '#161b22')
      root.style.setProperty('--bg-tertiary', '#21262d')
      root.style.setProperty('--border', '#30363d')
      root.style.setProperty('--text-primary', '#c9d1d9')
      root.style.setProperty('--text-secondary', '#8b949e')
      root.style.setProperty('--accent-green', '#238636')
      root.style.setProperty('--accent-green-light', '#3fb950')
      break
  }
}
