'use client'

import styles from './Holdings.module.css'

interface Holding {
  code: string
  name: string
  quantity: number
  avgPrice: number
  currentPrice: number
}

interface HoldingsProps {
  holdings: Record<string, { quantity: number; avgPrice: number }>
  stocks: { code: string; name: string; price: number }[]
  onSelectStock: (code: string) => void
}

export default function Holdings({ holdings, stocks, onSelectStock }: HoldingsProps) {
  const holdingsList = Object.entries(holdings)
    .filter(([_, data]) => data.quantity > 0)
    .map(([code, data]) => {
      const stock = stocks.find((s) => s.code === code)
      return {
        code,
        name: stock?.name || code,
        quantity: data.quantity,
        avgPrice: data.avgPrice,
        currentPrice: stock?.price || data.avgPrice,
      }
    })

  if (holdingsList.length === 0) {
    return (
      <div className={styles.container}>
        <h3 className={styles.title}>持仓</h3>
        <div className={styles.empty}>暂无持仓</div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>持仓</h3>
      <div className={styles.list}>
        {holdingsList.map((holding) => {
          const profit = (holding.currentPrice - holding.avgPrice) * holding.quantity
          const profitPercent = ((holding.currentPrice - holding.avgPrice) / holding.avgPrice) * 100

          return (
            <button
              key={holding.code}
              className={styles.item}
              onClick={() => onSelectStock(holding.code)}
            >
              <div className={styles.info}>
                <span className={styles.code}>{holding.code}</span>
                <span className={styles.name}>{holding.name}</span>
                <span className={styles.quantity}>{holding.quantity}股</span>
              </div>
              <div className={styles.priceInfo}>
                <span className={styles.currentPrice}>
                  ¥{holding.currentPrice.toFixed(2)}
                </span>
                <span className={`${styles.profit} ${profit >= 0 ? styles.profitUp : styles.profitDown}`}>
                  {profit >= 0 ? '+' : ''}¥{profit.toFixed(2)} ({profit >= 0 ? '+' : ''}{profitPercent.toFixed(2)}%)
                </span>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
