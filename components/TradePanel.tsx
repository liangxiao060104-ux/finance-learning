'use client'

import { useState, useEffect } from 'react'
import styles from './TradePanel.module.css'

interface Stock {
  code: string
  name: string
  price: number
}

interface TradePanelProps {
  stock: Stock | null
  balance: number
  holdings: Record<string, { quantity: number; avgPrice: number }>
  onTrade: (type: 'buy' | 'sell', quantity: number) => void
}

export default function TradePanel({ stock, balance, holdings, onTrade }: TradePanelProps) {
  const [quantity, setQuantity] = useState(1)
  const [tradeType, setTradeType] = useState<'buy' | 'sell'>('buy')

  useEffect(() => {
    setQuantity(1)
  }, [stock])

  if (!stock) {
    return (
      <div className={styles.container}>
        <div className={styles.placeholder}>
          选择一只股票进行交易
        </div>
      </div>
    )
  }

  const currentQuantity = holdings[stock.code]?.quantity || 0
  const total = stock.price * quantity
  const maxBuy = Math.floor(balance / stock.price)
  const maxSell = currentQuantity

  const handleQuantityChange = (value: number) => {
    setQuantity(Math.max(1, value))
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.code}>{stock.code}</span>
        <span className={styles.name}>{stock.name}</span>
        <span className={styles.price}>{stock.price.toFixed(2)}</span>
      </div>

      <div className={styles.balance}>
        <span>可用资金</span>
        <span className={styles.balanceValue}>
          ¥{balance.toLocaleString()}
        </span>
      </div>

      {tradeType === 'sell' && (
        <div className={styles.holding}>
          <span>持有数量</span>
          <span className={styles.holdingValue}>{currentQuantity} 股</span>
        </div>
      )}

      <div className={styles.typeToggle}>
        <button
          className={`${styles.typeBtn} ${tradeType === 'buy' ? styles.activeBuy : ''}`}
          onClick={() => setTradeType('buy')}
        >
          买入
        </button>
        <button
          className={`${styles.typeBtn} ${tradeType === 'sell' ? styles.activeSell : ''}`}
          onClick={() => setTradeType('sell')}
          disabled={currentQuantity === 0}
        >
          卖出
        </button>
      </div>

      <div className={styles.quantity}>
        <label>数量</label>
        <div className={styles.quantityControl}>
          <button
            onClick={() => handleQuantityChange(quantity - 1)}
            disabled={quantity <= 1}
          >
            -
          </button>
          <input
            type="number"
            value={quantity}
            onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
            min="1"
          />
          <button
            onClick={() => handleQuantityChange(quantity + 1)}
            disabled={
              tradeType === 'buy'
                ? quantity >= maxBuy
                : quantity >= maxSell
            }
          >
            +
          </button>
        </div>
        {tradeType === 'buy' && (
          <button
            className={styles.maxBtn}
            onClick={() => setQuantity(maxBuy)}
            disabled={maxBuy === 0}
          >
            最大{maxBuy}
          </button>
        )}
        {tradeType === 'sell' && (
          <button
            className={styles.maxBtn}
            onClick={() => setQuantity(maxSell)}
            disabled={maxSell === 0}
          >
            最大{maxSell}
          </button>
        )}
      </div>

      <div className={styles.total}>
        <span>交易总额</span>
        <span className={styles.totalValue}>¥{total.toLocaleString()}</span>
      </div>

      <button
        className={`${styles.tradeBtn} ${tradeType === 'buy' ? styles.buyBtn : styles.sellBtn}`}
        onClick={() => onTrade(tradeType, quantity)}
        disabled={
          tradeType === 'buy'
            ? quantity > maxBuy || balance < total
            : quantity > maxSell
        }
      >
        {tradeType === 'buy' ? '买入' : '卖出'} {stock.code}
      </button>
    </div>
  )
}
