// Marketing adapter: no hosted tracking or desktop-only behavior is needed in the public faithful landing target.
export const isHosted = false
export const isProd = process.env.NODE_ENV === 'production'
export const isChatEnabled = false
export const isReactGrabEnabled = false
export const isReactScanEnabled = false
