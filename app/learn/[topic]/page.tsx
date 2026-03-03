'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { topics, getTopicById, Topic } from '@/data/topics'
import KnowledgeMap from '@/components/KnowledgeMap'
import { getProgress, updateTopicProgress, recordLearningActivity } from '@/lib/storage'
import styles from './page.module.css'

export default function TopicPage() {
  const params = useParams()
  const topicId = params.topic as string
  const [topic, setTopic] = useState<Topic | undefined>()
  const [progress, setProgress] = useState(0)
  const [showQuiz, setShowQuiz] = useState(false)

  useEffect(() => {
    const topicData = getTopicById(topicId)
    setTopic(topicData)
    if (topicData) {
      const userProgress = getProgress()
      setProgress(userProgress.topics?.[topicId] || 0)
    }
  }, [topicId])

  const handleMarkComplete = () => {
    updateTopicProgress(topicId, 100)
    recordLearningActivity(30)
    setProgress(100)
  }

  if (!topic) {
    return (
      <div className={styles.notFound}>
        <h1>主题未找到</h1>
        <Link href="/learn">返回学习中心</Link>
      </div>
    )
  }

  const prevTopic = topic.prevTopic ? getTopicById(topic.prevTopic) : null
  const nextTopic = topic.nextTopic ? getTopicById(topic.nextTopic) : null

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link href="/learn" className={styles.backLink}>
          ← 返回学习中心
        </Link>
        <div className={styles.titleRow}>
          <span className={styles.icon}>{topic.icon}</span>
          <h1>{topic.title}</h1>
        </div>
        <p className={styles.description}>{topic.description}</p>
        <div className={styles.progress}>
          <span>学习进度: {progress}%</span>
          {progress < 100 && (
            <button onClick={handleMarkComplete} className="btn-primary">
              标记为已完成
            </button>
          )}
          {progress >= 100 && (
            <span className={styles.completed}>✓ 已完成</span>
          )}
        </div>
      </header>

      <section className={styles.content}>
        {topic.sections.map((section, index) => (
          <div key={index} className={styles.section}>
            <h2>{section.title}</h2>
            <div className={styles.sectionContent}>
              {section.content.split('\n').map((line, i) => {
                if (line.startsWith('**') && line.endsWith('**')) {
                  return <h3 key={i}>{line.replace(/\*\*/g, '')}</h3>
                }
                if (line.startsWith('- ')) {
                  return <li key={i}>{line.slice(2)}</li>
                }
                if (line.startsWith('公式：')) {
                  return <div key={i} className={styles.formula}>{line}</div>
                }
                return line ? <p key={i}>{line}</p> : null
              })}
            </div>
          </div>
        ))}
      </section>

      <section className={styles.terms}>
        <h2>关键术语</h2>
        <div className={styles.termsGrid}>
          {topic.terms.map((term, index) => (
            <div key={index} className={styles.termCard}>
              <span className={styles.termName}>{term.term}</span>
              <span className={styles.termDef}>{term.definition}</span>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.quizSection}>
        <h2>章节测验</h2>
        {!showQuiz ? (
          <button
            onClick={() => setShowQuiz(true)}
            className="btn-primary"
          >
            开始测验 ({topic.quiz.length}题)
          </button>
        ) : (
          <div className={styles.quiz}>
            {topic.quiz.map((question, qIndex) => (
              <QuizQuestion
                key={question.id}
                question={question}
                index={qIndex}
                topicId={topicId}
              />
            ))}
            <button
              onClick={() => setShowQuiz(false)}
              className="btn-secondary"
            >
              收起测验
            </button>
          </div>
        )}
      </section>

      <KnowledgeMap
        prevTopic={topic.prevTopic}
        nextTopic={topic.nextTopic}
        prevRelation={topic.prevRelation}
        nextRelation={topic.nextRelation}
        prevTitle={prevTopic?.title}
        nextTitle={nextTopic?.title}
      />
    </div>
  )
}

function QuizQuestion({
  question,
  index,
  topicId,
}: {
  question: any
  index: number
  topicId: string
}) {
  const [selected, setSelected] = useState<number | null>(null)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = () => {
    if (selected === null) return
    setSubmitted(true)
  }

  const isCorrect =
    submitted &&
    (Array.isArray(question.answer)
      ? question.answer.includes(selected)
      : selected === question.answer)

  return (
    <div className={styles.question}>
      <p className={styles.questionText}>
        {index + 1}. {question.question}
      </p>
      <div className={styles.options}>
        {question.options.map((option: string, i: number) => (
          <button
            key={i}
            className={`${styles.option} ${
              selected === i ? styles.selected : ''
            } ${
              submitted
                ? i === question.answer
                  ? styles.correct
                  : selected === i
                  ? styles.wrong
                  : ''
                : ''
            }`}
            onClick={() => !submitted && setSelected(i)}
            disabled={submitted}
          >
            {option}
          </button>
        ))}
      </div>
      {submitted && (
        <div className={styles.explanation}>
          {isCorrect ? '✓ 回答正确' : '✗ 回答错误'}
          <p>{question.explanation}</p>
        </div>
      )}
      {!submitted && (
        <button
          onClick={handleSubmit}
          disabled={selected === null}
          className="btn-primary"
        >
          提交答案
        </button>
      )}
    </div>
  )
}
