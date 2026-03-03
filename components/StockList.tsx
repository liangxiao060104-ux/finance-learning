'use client'

import styles from './StockList.module.css'

interface Stock {
  code: string
  name: string
  price: number
  change: number
  changePercent: number
}

interface StockListProps {
  stocks: Stock[]
  selectedStock: string | null
  onSelectStock: (code: string) => void
}

export default function StockList({ stocks, selectedStock, onSelectStock }: StockListProps) {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>股票列表</h3>
      <div className={styles.list}>
        {stocks.map((stock) => (
          <button
            key={stock.code}
            className={`${styles.item} ${selectedStock === stock.code ? styles.selected : ''}`}
            onClick={() => onSelectStock(stock.code)}
          >
            <div className={styles.info}>
              <span className={styles.code}>{stock.code}</span>
              <span className={styles.name}>{stock.name}</span>
            </div>
            <div className={styles.price}>
              <span className={styles.priceValue}>{stock.price.toFixed(2)}</span>
              <span className={`${styles.change} ${stock.change >= 0 ? styles.up : styles.down}`}>
                {stock.change >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
