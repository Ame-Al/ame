import type { BrandConfig } from './types'

/**
 * Default brand configuration values
 */
export const defaultBrandConfig: BrandConfig = {
  name: 'Ame',
  logoUrl: undefined,
  wordmarkUrl: undefined,
  faviconUrl: undefined,
  customCssUrl: undefined,
  supportEmail: 'galaxyoram@gmail.com',
  documentationUrl: undefined,
  termsUrl: undefined,
  privacyUrl: undefined,
  theme: {
    primaryColor: '#33c482',
    primaryHoverColor: '#2dac72',
    accentColor: '#33b4ff',
    accentHoverColor: '#29a0e8',
    backgroundColor: '#0c0c0c',
  },
  isWhitelabeled: false,
}
