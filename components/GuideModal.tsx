'use client'

import { useState, useEffect } from 'react'
import styles from './GuideModal.module.css'

interface GuideModalProps {
  isOpen: boolean
  onClose: () => void
}

const guideSteps = [
  {
    title: '欢迎来到模拟交易',
    content: '这里你可以用虚拟资金体验真实的股票交易，帮助你学习投资技巧。',
    icon: '👋',
  },
  {
    title: '选择股票',
    content: '在左侧股票列表中点击你感兴趣的股票，查看它的价格和走势。',
    icon: '📊',
  },
  {
    title: '买入股票',
    content: '选择"买入"，输入数量，点击交易按钮即可买入股票。初始资金10万元。',
    icon: '💰',
  },
  {
    title: '卖出股票',
    content: '当股票价格上涨后，选择"卖出"即可获利。低价买入高价卖出是盈利关键！',
    icon: '📈',
  },
  {
    title: '注意事项',
    content: '股市有风险，投资需谨慎。模拟交易仅供学习，不代表真实投资结果。',
    icon: '⚠️',
  },
]

export default function GuideModal({ isOpen, onClose }: GuideModalProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (isOpen) {
      // 延迟显示动画
      setTimeout(() => setIsVisible(true), 10)
    } else {
      setIsVisible(false)
      setCurrentStep(0)
    }
  }, [isOpen])

  if (!isOpen && !isVisible) return null

  const handleNext = () => {
    if (currentStep < guideSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSkip = () => {
    onClose()
  }

  const step = guideSteps[currentStep]
  const isLastStep = currentStep === guideSteps.length - 1

  return (
    <div className={`${styles.overlay} ${isVisible ? styles.visible : ''}`}>
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={handleSkip}>
          ✕
        </button>

        <div className={styles.icon}>{step.icon}</div>
        <h2 className={styles.title}>{step.title}</h2>
        <p className={styles.content}>{step.content}</p>

        <div className={styles.dots}>
          {guideSteps.map((_, index) => (
            <span
              key={index}
              className={`${styles.dot} ${index === currentStep ? styles.activeDot : ''}`}
            />
          ))}
        </div>

        <div className={styles.actions}>
          <button
            className={styles.prevBtn}
            onClick={handlePrev}
            disabled={currentStep === 0}
          >
            上一步
          </button>

          {isLastStep ? (
            <button className={styles.doneBtn} onClick={handleSkip}>
              开始交易 🚀
            </button>
          ) : (
            <button className={styles.nextBtn} onClick={handleNext}>
              下一步
            </button>
          )}

          <button className={styles.skipBtn} onClick={handleSkip}>
            跳过
          </button>
        </div>
      </div>
    </div>
  )
}
