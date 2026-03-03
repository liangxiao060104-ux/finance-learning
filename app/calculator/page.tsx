'use client'

import { useState } from 'react'
import styles from './page.module.css'

type CalculatorType = 'compound' | 'loan' | 'roi' | 'dca'

export default function CalculatorPage() {
  const [activeTab, setActiveTab] = useState<CalculatorType>('compound')

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>理财计算器</h1>
        <p className={styles.subtitle}>各种实用理财工具，帮助你规划财务</p>
      </header>

      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === 'compound' ? styles.active : ''}`}
          onClick={() => setActiveTab('compound')}
        >
          复利计算器
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'loan' ? styles.active : ''}`}
          onClick={() => setActiveTab('loan')}
        >
          贷款计算器
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'roi' ? styles.active : ''}`}
          onClick={() => setActiveTab('roi')}
        >
          投资回报率
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'dca' ? styles.active : ''}`}
          onClick={() => setActiveTab('dca')}
        >
          定投计算器
        </button>
      </div>

      <div className={styles.content}>
        {activeTab === 'compound' && <CompoundCalculator />}
        {activeTab === 'loan' && <LoanCalculator />}
        {activeTab === 'roi' && <ROICalculator />}
        {activeTab === 'dca' && <DCACalculator />}
      </div>
    </div>
  )
}

// 复利计算器
function CompoundCalculator() {
  const [principal, setPrincipal] = useState(10000)
  const [rate, setRate] = useState(5)
  const [years, setYears] = useState(10)
  const [frequency, setFrequency] = useState(12)

  const result = principal * Math.pow(1 + rate / 100 / frequency, frequency * years)
  const interest = result - principal

  return (
    <div className={styles.calculator}>
      <h2>复利计算器</h2>
      <p className={styles.desc}>计算复利增长后的最终金额</p>

      <div className={styles.form}>
        <div className={styles.field}>
          <label>初始本金 (元)</label>
          <input
            type="number"
            value={principal}
            onChange={(e) => setPrincipal(Number(e.target.value))}
          />
        </div>
        <div className={styles.field}>
          <label>年利率 (%)</label>
          <input
            type="number"
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            step="0.1"
          />
        </div>
        <div className={styles.field}>
          <label>投资年限</label>
          <input
            type="number"
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
          />
        </div>
        <div className={styles.field}>
          <label>复利频率</label>
          <select value={frequency} onChange={(e) => setFrequency(Number(e.target.value))}>
            <option value={1}>每年</option>
            <option value={4}>每季度</option>
            <option value={12}>每月</option>
            <option value={365}>每日</option>
          </select>
        </div>
      </div>

      <div className={styles.result}>
        <div className={styles.resultItem}>
          <span>最终金额</span>
          <span className={styles.resultValue}>¥{result.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
        </div>
        <div className={styles.resultItem}>
          <span>利息收益</span>
          <span className={styles.resultValue}>¥{interest.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
        </div>
      </div>
    </div>
  )
}

// 贷款计算器
function LoanCalculator() {
  const [amount, setAmount] = useState(100000)
  const [rate, setRate] = useState(4.9)
  const [years, setYears] = useState(20)

  // 等额本息计算
  const monthlyRate = rate / 100 / 12
  const months = years * 12
  const monthlyPayment =
    (amount * monthlyRate * Math.pow(1 + monthlyRate, months)) /
    (Math.pow(1 + monthlyRate, months) - 1)
  const totalPayment = monthlyPayment * months
  const totalInterest = totalPayment - amount

  return (
    <div className={styles.calculator}>
      <h2>贷款计算器</h2>
      <p className={styles.desc}>计算等额本息还款方式的月供和总利息</p>

      <div className={styles.form}>
        <div className={styles.field}>
          <label>贷款金额 (元)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
        </div>
        <div className={styles.field}>
          <label>年利率 (%)</label>
          <input
            type="number"
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            step="0.1"
          />
        </div>
        <div className={styles.field}>
          <label>贷款期限 (年)</label>
          <input
            type="number"
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
          />
        </div>
      </div>

      <div className={styles.result}>
        <div className={styles.resultItem}>
          <span>每月月供</span>
          <span className={styles.resultValue}>¥{monthlyPayment.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
        </div>
        <div className={styles.resultItem}>
          <span>还款总额</span>
          <span className={styles.resultValue}>¥{totalPayment.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
        </div>
        <div className={styles.resultItem}>
          <span>总利息</span>
          <span className={styles.resultValue}>¥{totalInterest.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
        </div>
      </div>
    </div>
  )
}

// 投资回报率计算器
function ROICalculator() {
  const [cost, setCost] = useState(10000)
  const [returnAmount, setReturnAmount] = useState(15000)

  const roi = ((returnAmount - cost) / cost) * 100
  const profit = returnAmount - cost

  return (
    <div className={styles.calculator}>
      <h2>投资回报率计算器</h2>
      <p className={styles.desc}>计算投资的回报率</p>

      <div className={styles.form}>
        <div className={styles.field}>
          <label>投资成本 (元)</label>
          <input
            type="number"
            value={cost}
            onChange={(e) => setCost(Number(e.target.value))}
          />
        </div>
        <div className={styles.field}>
          <label>投资回报 (元)</label>
          <input
            type="number"
            value={returnAmount}
            onChange={(e) => setReturnAmount(Number(e.target.value))}
          />
        </div>
      </div>

      <div className={styles.result}>
        <div className={styles.resultItem}>
          <span>投资回报率</span>
          <span className={`${styles.resultValue} ${roi >= 0 ? styles.positive : styles.negative}`}>
            {roi >= 0 ? '+' : ''}{roi.toFixed(2)}%
          </span>
        </div>
        <div className={styles.resultItem}>
          <span>投资收益</span>
          <span className={`${styles.resultValue} ${profit >= 0 ? styles.positive : styles.negative}`}>
            {profit >= 0 ? '+' : ''}¥{profit.toLocaleString(undefined, { maximumFractionDigits: 2 })}
          </span>
        </div>
      </div>
    </div>
  )
}

// 定投计算器
function DCACalculator() {
  const [monthlyAmount, setMonthlyAmount] = useState(1000)
  const [rate, setRate] = useState(8)
  const [years, setYears] = useState(10)

  // 定期定额复利计算
  const monthlyRate = rate / 100 / 12
  const months = years * 12

  // 每月定投公式: FV = PMT × [((1 + r)^n - 1) / r]
  const futureValue = monthlyAmount * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate)
  const totalInvested = monthlyAmount * months
  const totalInterest = futureValue - totalInvested

  return (
    <div className={styles.calculator}>
      <h2>定投计算器</h2>
      <p className={styles.desc}>计算定期定额投资的最终收益</p>

      <div className={styles.form}>
        <div className={styles.field}>
          <label>每月定投金额 (元)</label>
          <input
            type="number"
            value={monthlyAmount}
            onChange={(e) => setMonthlyAmount(Number(e.target.value))}
          />
        </div>
        <div className={styles.field}>
          <label>预期年收益率 (%)</label>
          <input
            type="number"
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            step="0.1"
          />
        </div>
        <div className={styles.field}>
          <label>定投期限 (年)</label>
          <input
            type="number"
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
          />
        </div>
      </div>

      <div className={styles.result}>
        <div className={styles.resultItem}>
          <span>最终金额</span>
          <span className={styles.resultValue}>¥{futureValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
        </div>
        <div className={styles.resultItem}>
          <span>累计投入</span>
          <span className={styles.resultValue}>¥{totalInvested.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
        </div>
        <div className={styles.resultItem}>
          <span>投资收益</span>
          <span className={styles.resultValue}>¥{totalInterest.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
        </div>
      </div>
    </div>
  )
}
