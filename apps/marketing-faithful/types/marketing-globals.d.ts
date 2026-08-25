import type { SimDesktopApi } from '@sim/desktop-bridge'

declare global {
  interface Window {
    __ENV?: Record<string, string | undefined>
    simDesktop?: SimDesktopApi
  }
}
