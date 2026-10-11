import type { ReactNode } from 'react'
import { Header } from '../Header/Header'
import vkIcon from '../../assets/icons/vk.svg'
import tgIcon from '../../assets/icons/tg.svg'
import okIcon from '../../assets/icons/ok.svg'
import youtubeIcon from '../../assets/icons/youtube.svg'
import './Layout.css'

type LayoutProps = {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header />
      <div className="layout">{children}</div>

      <nav className="layout__socials" aria-label="Социальные сети">
        <a href="#" aria-label="ВКонтакте">
          <img src={vkIcon} alt="" />
        </a>
        <a href="#" aria-label="Telegram">
          <img src={tgIcon} alt="" />
        </a>
        <a href="#" aria-label="Одноклассники">
          <img src={okIcon} alt="" />
        </a>
        <a href="#" aria-label="YouTube">
          <img src={youtubeIcon} alt="" />
        </a>
      </nav>
    </>
  )
}