'use client'

import { useState, useEffect } from 'react'
import { getLibrary, removeFromLibrary, CollectionItem } from '@/lib/storage'
import styles from './page.module.css'

type FilterType = 'all' | '知识点' | '交易记录' | '计算器结果'

export default function LibraryPage() {
  const [items, setItems] = useState<CollectionItem[]>([])
  const [filter, setFilter] = useState<FilterType>('all')

  useEffect(() => {
    setItems(getLibrary())
  }, [])

  const handleDelete = (id: string) => {
    removeFromLibrary(id)
    setItems(getLibrary())
  }

  const filteredItems = filter === 'all'
    ? items
    : items.filter(item => item.type === filter)

  const typeIcons: Record<string, string> = {
    '知识点': '📚',
    '交易记录': '💹',
    '计算器结果': '🧮',
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>个人收藏库</h1>
        <p className={styles.subtitle}>收藏你喜欢的知识点、交易记录和计算结果</p>
      </header>

      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${filter === 'all' ? styles.active : ''}`}
          onClick={() => setFilter('all')}
        >
          全部 ({items.length})
        </button>
        <button
          className={`${styles.tab} ${filter === '知识点' ? styles.active : ''}`}
          onClick={() => setFilter('知识点')}
        >
          知识点 ({items.filter(i => i.type === '知识点').length})
        </button>
        <button
          className={`${styles.tab} ${filter === '交易记录' ? styles.active : ''}`}
          onClick={() => setFilter('交易记录')}
        >
          交易记录 ({items.filter(i => i.type === '交易记录').length})
        </button>
        <button
          className={`${styles.tab} ${filter === '计算器结果' ? styles.active : ''}`}
          onClick={() => setFilter('计算器结果')}
        >
          计算器结果 ({items.filter(i => i.type === '计算器结果').length})
        </button>
      </div>

      {filteredItems.length === 0 ? (
        <div className={styles.empty}>
          <span className={styles.emptyIcon}>📁</span>
          <p>暂无收藏内容</p>
          <p className={styles.emptyHint}>
            在学习内容、交易记录或计算器中点击收藏按钮添加
          </p>
        </div>
      ) : (
        <div className={styles.list}>
          {filteredItems.map((item) => (
            <div key={item.id} className={styles.item}>
              <div className={styles.itemHeader}>
                <span className={styles.itemIcon}>{typeIcons[item.type]}</span>
                <span className={styles.itemType}>{item.type}</span>
                <span className={styles.itemDate}>
                  {new Date(item.createdAt).toLocaleDateString('zh-CN')}
                </span>
              </div>
              <h3 className={styles.itemTitle}>{item.title}</h3>
              <div className={styles.itemContent}>
                {typeof item.content === 'string'
                  ? item.content
                  : JSON.stringify(item.content)}
              </div>
              <button
                onClick={() => handleDelete(item.id)}
                className={styles.deleteBtn}
              >
                删除
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
