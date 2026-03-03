'use client'

import { useState, useEffect } from 'react'
import StockList from '@/components/StockList'
import TradePanel from '@/components/TradePanel'
import Holdings from '@/components/Holdings'
import GuideModal from '@/components/GuideModal'
import { virtualStocks, generateDailyPrices, Stock } from '@/lib/stocks'
import { getSimulateData, saveSimulateData, SimulateData } from '@/lib/storage'
import styles from './page.module.css'

const GUIDE_KEY = 'finance_simulate_guide_shown'

export default function SimulatePage() {
  const [stocks, setStocks] = useState<Stock[]>(virtualStocks)
  const [selectedStock, setSelectedStock] = useState<string | null>(null)
  const [simulateData, setSimulateData] = useState<SimulateData | null>(null)
  const [showGuide, setShowGuide] = useState(false)

  useEffect(() => {
    // 加载数据
    setSimulateData(getSimulateData())
    // 生成当日价格
    setStocks(generateDailyPrices())

    // 检查是否需要显示指南
    const guideShown = localStorage.getItem(GUIDE_KEY)
    if (!guideShown) {
      setShowGuide(true)
    }
  }, [])

  const handleTrade = (type: 'buy' | 'sell', quantity: number) => {
    if (!simulateData || !selectedStock) return

    const stock = stocks.find((s) => s.code === selectedStock)
    if (!stock) return

    const newData = { ...simulateData }

    if (type === 'buy') {
      const total = stock.price * quantity
      if (total > newData.balance) return

      // 更新持仓
      if (!newData.holdings[stock.code]) {
        newData.holdings[stock.code] = { quantity: 0, avgPrice: 0 }
      }
      const oldQuantity = newData.holdings[stock.code].quantity
      const oldValue = oldQuantity * newData.holdings[stock.code].avgPrice
      const newQuantity = oldQuantity + quantity
      const newValue = oldValue + total

      newData.holdings[stock.code] = {
        quantity: newQuantity,
        avgPrice: newValue / newQuantity,
      }
      newData.balance -= total
    } else {
      const holding = newData.holdings[stock.code]
      if (!holding || holding.quantity < quantity) return

      const total = stock.price * quantity
      holding.quantity -= quantity

      if (holding.quantity === 0) {
        delete newData.holdings[stock.code]
      }

      newData.balance += total
    }

    // 记录交易
    newData.transactions.unshift({
      id: Date.now().toString(),
      stockCode: stock.code,
      stockName: stock.name,
      type,
      quantity,
      price: stock.price,
      total: stock.price * quantity,
      date: new Date().toISOString(),
    })

    // 保持交易记录不超过100条
    if (newData.transactions.length > 100) {
      newData.transactions = newData.transactions.slice(0, 100)
    }

    saveSimulateData(newData)
    setSimulateData(newData)
  }

  const handleRefreshPrices = () => {
    setStocks(generateDailyPrices())
  }

  const handleCloseGuide = () => {
    setShowGuide(false)
    localStorage.setItem(GUIDE_KEY, 'true')
  }

  const handleReset = () => {
    const newData: SimulateData = {
      balance: 100000,
      holdings: {},
      transactions: [],
    }
    saveSimulateData(newData)
    setSimulateData(newData)
  }

  // 计算总资产
  const totalAssets = simulateData
    ? simulateData.balance +
      Object.entries(simulateData.holdings).reduce((sum, [code, data]) => {
        const stock = stocks.find((s) => s.code === code)
        return sum + (stock?.price || 0) * data.quantity
      }, 0)
    : 100000

  const profit = totalAssets - 100000
  const profitPercent = (profit / 100000) * 100

  return (
    <div className={styles.container}>
      <GuideModal isOpen={showGuide} onClose={handleCloseGuide} />
      <header className={styles.header}>
        <h1>模拟交易</h1>
        <div className={styles.actions}>
          <button onClick={handleRefreshPrices} className="btn-secondary">
            刷新价格
          </button>
          <button onClick={handleReset} className="btn-secondary">
            重置账户
          </button>
        </div>
      </header>

      <div className={styles.accounts}>
        <div className={styles.accountCard}>
          <span className={styles.accountLabel}>总资产</span>
          <span className={styles.accountValue}>¥{totalAssets.toLocaleString()}</span>
        </div>
        <div className={styles.accountCard}>
          <span className={styles.accountLabel}>可用资金</span>
          <span className={styles.accountValue}>
            ¥{(simulateData?.balance || 100000).toLocaleString()}
          </span>
        </div>
        <div className={styles.accountCard}>
          <span className={styles.accountLabel}>持仓盈亏</span>
          <span className={`${styles.accountValue} ${profit >= 0 ? styles.profitUp : styles.profitDown}`}>
            {profit >= 0 ? '+' : ''}¥{profit.toFixed(2)} ({profit >= 0 ? '+' : ''}{profitPercent.toFixed(2)}%)
          </span>
        </div>
      </div>

      <div className={styles.main}>
        <div className={styles.left}>
          <StockList
            stocks={stocks}
            selectedStock={selectedStock}
            onSelectStock={setSelectedStock}
          />
          <Holdings
            holdings={simulateData?.holdings || {}}
            stocks={stocks}
            onSelectStock={setSelectedStock}
          />
        </div>
        <div className={styles.right}>
          <TradePanel
            stock={selectedStock ? stocks.find((s) => s.code === selectedStock) || null : null}
            balance={simulateData?.balance || 100000}
            holdings={simulateData?.holdings || {}}
            onTrade={handleTrade}
          />

          <div className={styles.transactions}>
            <h3>交易记录</h3>
            <div className={styles.transactionList}>
              {simulateData?.transactions.slice(0, 10).map((tx) => (
                <div key={tx.id} className={styles.transaction}>
                  <span className={`${styles.txType} ${tx.type === 'buy' ? styles.buy : styles.sell}`}>
                    {tx.type === 'buy' ? '买入' : '卖出'}
                  </span>
                  <span className={styles.txCode}>{tx.stockCode}</span>
                  <span className={styles.txQuantity}>{tx.quantity}股</span>
                  <span className={styles.txPrice}>¥{tx.total.toLocaleString()}</span>
                </div>
              ))}
              {(!simulateData?.transactions || simulateData.transactions.length === 0) && (
                <div className={styles.emptyTx}>暂无交易记录</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
