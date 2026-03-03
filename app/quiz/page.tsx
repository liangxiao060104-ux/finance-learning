'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { topics, Topic } from '@/data/topics'
import { getProgress, saveQuizScore } from '@/lib/storage'
import styles from './page.module.css'

interface QuizScore {
  topicId: string
  score: number
  total: number
}

export default function QuizPage() {
  const [scores, setScores] = useState<QuizScore[]>([])
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [quizScore, setQuizScore] = useState(0)

  useEffect(() => {
    const progress = getProgress()
    const scoresList: QuizScore[] = topics.map((topic) => ({
      topicId: topic.id,
      score: progress.quizScores?.[topic.id] || 0,
      total: topic.quiz.length * 100,
    }))
    setScores(scoresList)
  }, [selectedTopic])

  const handleStartQuiz = (topicId: string) => {
    setSelectedTopic(topicId)
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setSubmitted(false)
    setQuizScore(0)
  }

  const handleSubmit = () => {
    if (selectedAnswer === null) return

    const topic = topics.find((t) => t.id === selectedTopic)
    if (!topic) return

    const isCorrect =
      Array.isArray(topic.quiz[currentQuestion].answer)
        ? topic.quiz[currentQuestion].answer.includes(selectedAnswer)
        : selectedAnswer === topic.quiz[currentQuestion].answer

    if (isCorrect) {
      setQuizScore((prev) => prev + 100)
    }

    setSubmitted(true)
  }

  const handleNext = () => {
    const topic = topics.find((t) => t.id === selectedTopic)
    if (!topic) return

    if (currentQuestion < topic.quiz.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
      setSelectedAnswer(null)
      setSubmitted(false)
    } else {
      // 完成测验
      const totalScore = quizScore + (submitted && selectedAnswer !== null ? (Array.isArray(topic.quiz[currentQuestion].answer)
        ? topic.quiz[currentQuestion].answer.includes(selectedAnswer)
        : selectedAnswer === topic.quiz[currentQuestion].answer) ? 100 : 0 : 0)
      const finalScore = Math.round((totalScore / (topic.quiz.length * 100)) * 100)
      saveQuizScore(selectedTopic!, finalScore)
      setScores((prev) =>
        prev.map((s) =>
          s.topicId === selectedTopic
            ? { ...s, score: finalScore }
            : s
        )
      )
      setSelectedTopic(null)
    }
  }

  if (selectedTopic) {
    const topic = topics.find((t) => t.id === selectedTopic)
    if (!topic) return null

    const question = topic.quiz[currentQuestion]
    const isCorrect =
      submitted &&
      (Array.isArray(question.answer)
        ? question.answer.includes(selectedAnswer!)
        : selectedAnswer === question.answer)

    return (
      <div className={styles.quizContainer}>
        <div className={styles.quizHeader}>
          <button onClick={() => setSelectedTopic(null)} className={styles.backBtn}>
            ← 返回
          </button>
          <h2>{topic.title} - 章节测验</h2>
          <span className={styles.progress}>
            {currentQuestion + 1}/{topic.quiz.length}
          </span>
        </div>

        <div className={styles.question}>
          <h3>{question.question}</h3>
          <div className={styles.options}>
            {question.options.map((option, index) => (
              <button
                key={index}
                className={`${styles.option} ${
                  selectedAnswer === index ? styles.selected : ''
                } ${
                  submitted
                    ? index === question.answer
                      ? styles.correct
                      : selectedAnswer === index
                      ? styles.wrong
                      : ''
                    : ''
                }`}
                onClick={() => !submitted && setSelectedAnswer(index)}
                disabled={submitted}
              >
                {option}
              </button>
            ))}
          </div>

          {submitted && (
            <div className={styles.explanation}>
              <p className={isCorrect ? styles.correctText : styles.wrongText}>
                {isCorrect ? '✓ 回答正确' : '✗ 回答错误'}
              </p>
              <p>{question.explanation}</p>
            </div>
          )}

          <div className={styles.actions}>
            {!submitted ? (
              <button
                onClick={handleSubmit}
                disabled={selectedAnswer === null}
                className="btn-primary"
              >
                提交答案
              </button>
            ) : (
              <button onClick={handleNext} className="btn-primary">
                {currentQuestion < topic.quiz.length - 1 ? '下一题' : '查看结果'}
              </button>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>知识测验</h1>
        <p className={styles.subtitle}>
          检验你的金融知识掌握程度
        </p>
      </header>

      <div className={styles.grid}>
        {topics.map((topic, index) => {
          const score = scores.find((s) => s.topicId === topic.id)
          return (
            <div key={topic.id} className={styles.card}>
              <div className={styles.cardHeader}>
                <span className={styles.icon}>{topic.icon}</span>
                <h3>{topic.title}</h3>
              </div>
              <p className={styles.cardDesc}>{topic.description}</p>
              <div className={styles.cardMeta}>
                <span>{topic.quiz.length} 道题目</span>
                {score && score.score > 0 ? (
                  <span className={styles.score}>{score.score}分</span>
                ) : (
                  <span className={styles.noScore}>未完成</span>
                )}
              </div>
              <button
                onClick={() => handleStartQuiz(topic.id)}
                className="btn-primary"
              >
                {score && score.score > 0 ? '重新测验' : '开始测验'}
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
