'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import ThemeSwitcher from './ThemeSwitcher'
import styles from './Header.module.css'

const navLinks = [
  { href: '/', label: '首页' },
  { href: '/learn', label: '学习中心' },
  { href: '/simulate', label: '模拟交易' },
  { href: '/quiz', label: '知识测验' },
  { href: '/calculator', label: '理财计算器' },
  { href: '/library', label: '收藏库' },
]

export default function Header() {
  const pathname = usePathname()

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <span className={styles.logoIcon}>💰</span>
          <Link href="/" className={styles.logoText}>
            金融学习平台
          </Link>
        </div>
        <nav className={styles.nav}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.navLink} ${
                pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))
                  ? styles.active
                  : ''
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className={styles.actions}>
          <ThemeSwitcher />
          <Link href="/profile" className={styles.profileLink}>
            <span className={styles.avatar}>👤</span>
            <span>个人中心</span>
          </Link>
        </div>
      </div>
    </header>
  )
}
