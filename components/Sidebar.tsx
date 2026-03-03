'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './Sidebar.module.css'

const sidebarLinks = [
  { href: '/learn', label: '学习中心', icon: '📚' },
  { href: '/learn/currency', label: '货币基础', icon: '💵' },
  { href: '/learn/banking', label: '银行存贷', icon: '🏦' },
  { href: '/learn/stock', label: '股票入门', icon: '📈' },
  { href: '/learn/bond', label: '债券基础', icon: '📜' },
  { href: '/learn/fund', label: '基金投资', icon: '💼' },
  { href: '/learn/analysis', label: '市场分析', icon: '🔍' },
  { href: '/learn/planning', label: '理财规划', icon: '🎯' },
  { href: '/learn/microeconomics', label: '微观经济学', icon: '🔬' },
  { href: '/learn/macroeconomics', label: '宏观经济学', icon: '🌐' },
  { href: '/learn/international-trade', label: '国际贸易学', icon: '🚢' },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className={styles.sidebar}>
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>学习导航</h3>
        <nav className={styles.nav}>
          {sidebarLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.navLink} ${
                pathname === link.href || pathname.startsWith(link.href + '/')
                  ? styles.active
                  : ''
              }`}
            >
              <span className={styles.icon}>{link.icon}</span>
              <span className={styles.label}>{link.label}</span>
            </Link>
          ))}
        </nav>
      </div>
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>快速入口</h3>
        <nav className={styles.nav}>
          <Link href="/simulate" className={`${styles.navLink} ${pathname === '/simulate' ? styles.active : ''}`}>
            <span className={styles.icon}>💹</span>
            <span className={styles.label}>模拟交易</span>
          </Link>
          <Link href="/quiz" className={`${styles.navLink} ${pathname === '/quiz' ? styles.active : ''}`}>
            <span className={styles.icon}>✅</span>
            <span className={styles.label}>知识测验</span>
          </Link>
          <Link href="/calculator" className={`${styles.navLink} ${pathname === '/calculator' ? styles.active : ''}`}>
            <span className={styles.icon}>🧮</span>
            <span className={styles.label}>理财计算器</span>
          </Link>
          <Link href="/library" className={`${styles.navLink} ${pathname === '/library' ? styles.active : ''}`}>
            <span className={styles.icon}>📁</span>
            <span className={styles.label}>我的收藏</span>
          </Link>
        </nav>
      </div>
    </aside>
  )
}
