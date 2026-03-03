// localStorage 工具库

export interface UserProgress {
  topics: Record<string, number>
  totalDays: number
  dailyActivity: Record<string, number>
  quizScores: Record<string, number>
}

export interface SimulateData {
  balance: number
  holdings: Record<string, { quantity: number; avgPrice: number }>
  transactions: Transaction[]
}

export interface Transaction {
  id: string
  stockCode: string
  stockName: string
  type: 'buy' | 'sell'
  quantity: number
  price: number
  total: number
  date: string
}

export interface CollectionItem {
  id: string
  type: '知识点' | '交易记录' | '计算器结果'
  title: string
  content: any
  createdAt: string
}

const PROGRESS_KEY = 'finance_user_progress'
const SIMULATE_KEY = 'finance_simulate_data'
const LIBRARY_KEY = 'finance_library'

// 用户进度
export function getProgress(): UserProgress {
  if (typeof window === 'undefined') {
    return getDefaultProgress()
  }
  const data = localStorage.getItem(PROGRESS_KEY)
  if (!data) return getDefaultProgress()
  try {
    return JSON.parse(data)
  } catch {
    return getDefaultProgress()
  }
}

export function saveProgress(progress: UserProgress): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress))
}

function getDefaultProgress(): UserProgress {
  return {
    topics: {},
    totalDays: 0,
    dailyActivity: {},
    quizScores: {},
  }
}

// 模拟交易数据
export function getSimulateData(): SimulateData {
  if (typeof window === 'undefined') {
    return getDefaultSimulateData()
  }
  const data = localStorage.getItem(SIMULATE_KEY)
  if (!data) return getDefaultSimulateData()
  try {
    return JSON.parse(data)
  } catch {
    return getDefaultSimulateData()
  }
}

export function saveSimulateData(data: SimulateData): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(SIMULATE_KEY, JSON.stringify(data))
}

function getDefaultSimulateData(): SimulateData {
  return {
    balance: 100000,
    holdings: {},
    transactions: [],
  }
}

// 收藏库
export function getLibrary(): CollectionItem[] {
  if (typeof window === 'undefined') return []
  const data = localStorage.getItem(LIBRARY_KEY)
  if (!data) return []
  try {
    return JSON.parse(data)
  } catch {
    return []
  }
}

export function saveLibrary(items: CollectionItem[]): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(LIBRARY_KEY, JSON.stringify(items))
}

export function addToLibrary(item: Omit<CollectionItem, 'id' | 'createdAt'>): void {
  const library = getLibrary()
  const newItem: CollectionItem = {
    ...item,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  }
  library.push(newItem)
  saveLibrary(library)
}

export function removeFromLibrary(id: string): void {
  const library = getLibrary()
  const filtered = library.filter((item) => item.id !== id)
  saveLibrary(filtered)
}

// 记录学习活动
export function recordLearningActivity(minutes: number): void {
  const progress = getProgress()
  const today = new Date().toISOString().split('T')[0]

  progress.dailyActivity[today] = (progress.dailyActivity[today] || 0) + minutes
  progress.totalDays = Object.keys(progress.dailyActivity).length

  saveProgress(progress)
}

// 更新主题进度
export function updateTopicProgress(topicId: string, progress: number): void {
  const data = getProgress()
  data.topics[topicId] = Math.max(data.topics[topicId] || 0, progress)
  saveProgress(data)
}

// 保存测验成绩
export function saveQuizScore(topicId: string, score: number): void {
  const data = getProgress()
  data.quizScores[topicId] = score
  saveProgress(data)
}
