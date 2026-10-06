import type { ReactNode } from 'react'
import { Header } from '../Header/Header'
import './Layout.css'

type LayoutProps = {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header />
      <div className="layout">{children}</div>
    </>
  )
}