// 虚拟股票数据

export interface Stock {
  code: string
  name: string
  price: number
  prevPrice: number
  change: number
  changePercent: number
  volatility: number
}

export const virtualStocks: Stock[] = [
  {
    code: 'FIN001',
    name: '金融科技',
    price: 100.0,
    prevPrice: 98.5,
    change: 1.5,
    changePercent: 1.52,
    volatility: 0.02,
  },
  {
    code: 'FIN002',
    name: '稳健银行',
    price: 50.0,
    prevPrice: 49.8,
    change: 0.2,
    changePercent: 0.4,
    volatility: 0.01,
  },
  {
    code: 'FIN003',
    name: '创新保险',
    price: 75.0,
    prevPrice: 73.5,
    change: 1.5,
    changePercent: 2.04,
    volatility: 0.018,
  },
  {
    code: 'FIN004',
    name: '数字支付',
    price: 120.0,
    prevPrice: 118.0,
    change: 2.0,
    changePercent: 1.69,
    volatility: 0.025,
  },
  {
    code: 'FIN005',
    name: '证券龙头',
    price: 85.0,
    prevPrice: 87.0,
    change: -2.0,
    changePercent: -2.3,
    volatility: 0.022,
  },
  {
    code: 'FIN006',
    name: '消费金融',
    price: 60.0,
    prevPrice: 58.5,
    change: 1.5,
    changePercent: 2.56,
    volatility: 0.02,
  },
  {
    code: 'FIN007',
    name: '资产管理',
    price: 45.0,
    prevPrice: 44.2,
    change: 0.8,
    changePercent: 1.81,
    volatility: 0.015,
  },
  {
    code: 'FIN008',
    name: '互联网银行',
    price: 95.0,
    prevPrice: 96.5,
    change: -1.5,
    changePercent: -1.55,
    volatility: 0.024,
  },
  {
    code: 'FIN009',
    name: '信用评估',
    price: 55.0,
    prevPrice: 54.0,
    change: 1.0,
    changePercent: 1.85,
    volatility: 0.019,
  },
  {
    code: 'FIN010',
    name: '区块链',
    price: 110.0,
    prevPrice: 105.0,
    change: 5.0,
    changePercent: 4.76,
    volatility: 0.035,
  },
  {
    code: 'FIN011',
    name: '财富管理',
    price: 70.0,
    prevPrice: 71.0,
    change: -1.0,
    changePercent: -1.41,
    volatility: 0.016,
  },
  {
    code: 'FIN012',
    name: '金融数据',
    price: 80.0,
    prevPrice: 79.0,
    change: 1.0,
    changePercent: 1.27,
    volatility: 0.017,
  },
]

// 生成每日价格波动
export function generateDailyPrices(): Stock[] {
  return virtualStocks.map((stock) => {
    const change = (Math.random() - 0.5) * 2 * stock.volatility * stock.price
    const newPrice = Math.max(1, stock.price + change)
    const priceChange = newPrice - stock.prevPrice
    const changePercent = (priceChange / stock.prevPrice) * 100

    return {
      ...stock,
      price: parseFloat(newPrice.toFixed(2)),
      change: parseFloat(priceChange.toFixed(2)),
      changePercent: parseFloat(changePercent.toFixed(2)),
    }
  })
}

// 获取股票信息
export function getStockByCode(code: string): Stock | undefined {
  return virtualStocks.find((s) => s.code === code)
}

// 格式化价格
export function formatPrice(price: number): string {
  return price.toFixed(2)
}

// 格式化涨跌幅
export function formatChange(change: number, changePercent: number): string {
  const sign = change >= 0 ? '+' : ''
  return `${sign}${change.toFixed(2)} (${sign}${changePercent.toFixed(2)}%)`
}

// 格式化金额
export function formatMoney(amount: number): string {
  return amount.toLocaleString('zh-CN', {
    style: 'currency',
    currency: 'CNY',
  })
}
