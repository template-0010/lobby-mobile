declare interface Window {
  jivo_api: Record<string, any>
}

export interface BalanceType {
  balance?: string
  freezeBalance?: string
}

declare module 'swiper/vue' {
  import type { DefineComponent } from 'vue'

  export const Swiper: DefineComponent
  export const SwiperSlide: DefineComponent
}

declare global {
  interface Window {
    isSimulatedClick: boolean
  }
}

export interface TopMenuType {
  title: string
  name: string // tab激活name
  image: string
  route: string
  routeName: string
  css: string
  isGrooup: boolean
  data: any[]
}
