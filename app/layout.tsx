import type { Metadata } from 'next'
import './globals.css'
import Layout from '@/components/Layout'
import { ThemeProvider } from '@/lib/theme'

export const metadata: Metadata = {
  title: '金融学习平台',
  description: '面向大学生的金融知识入门学习网站',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN" className="theme-dark">
      <body>
        <ThemeProvider>
          <Layout>{children}</Layout>
        </ThemeProvider>
      </body>
    </html>
  )
}
