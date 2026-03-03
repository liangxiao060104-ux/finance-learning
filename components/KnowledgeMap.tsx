'use client'

import Link from 'next/link'
import styles from './KnowledgeMap.module.css'

interface KnowledgeMapProps {
  prevTopic: string | null
  nextTopic: string | null
  prevRelation: string | null
  nextRelation: string
  prevTitle?: string
  nextTitle?: string
}

export default function KnowledgeMap({
  prevTopic,
  nextTopic,
  prevRelation,
  nextRelation,
  prevTitle,
  nextTitle,
}: KnowledgeMapProps) {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>知识脉络</h3>
      <div className={styles.map}>
        {prevTopic ? (
          <>
            <Link href={`/learn/${prevTopic}`} className={styles.node}>
              <span className={styles.nodeLabel}>上接</span>
              <span className={styles.nodeTitle}>{prevTitle}</span>
            </Link>
            <div className={styles.relation}>
              <span className={styles.relationText}>{prevRelation}</span>
            </div>
          </>
        ) : (
          <div className={styles.nodeDisabled}>
            <span className={styles.nodeLabel}>上接</span>
            <span className={styles.nodeTitle}>-</span>
          </div>
        )}

        <div className={styles.current}>
          <span className={styles.currentLabel}>当前位置</span>
        </div>

        {nextTopic ? (
          <>
            <div className={styles.relation}>
              <span className={styles.relationText}>{nextRelation}</span>
            </div>
            <Link href={`/learn/${nextTopic}`} className={styles.node}>
              <span className={styles.nodeLabel}>下启</span>
              <span className={styles.nodeTitle}>{nextTitle}</span>
            </Link>
          </>
        ) : (
          <div className={styles.nodeDisabled}>
            <span className={styles.nodeLabel}>下启</span>
            <span className={styles.nodeTitle}>-</span>
          </div>
        )}
      </div>
    </div>
  )
}
