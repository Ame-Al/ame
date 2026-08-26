import type { Metadata } from 'next'

interface LandingMetadataInput {
  title: string
  description: string
  path: string
  keywords?: string
  imageAlt?: string
  twitterImageAlt?: string
}

const SITE_URL = 'https://www.sim.ai'
const OG_IMAGE_URL = '/logo/426-240/reverse/small.png'

export function buildLandingMetadata({
  title,
  description,
  path,
  keywords,
  imageAlt,
  twitterImageAlt,
}: LandingMetadataInput): Metadata {
  const url = `${SITE_URL}${path}`
  const ogAlt = imageAlt ?? title
  const twitterAlt = twitterImageAlt ?? ogAlt

  return {
    metadataBase: new URL(SITE_URL),
    title: { absolute: title },
    description,
    ...(keywords ? { keywords } : {}),
    authors: [{ name: 'Ame' }],
    creator: 'Ame',
    publisher: 'Ame',
    openGraph: {
      title,
      description,
      type: 'website',
      url,
      siteName: 'Ame',
      locale: 'en_US',
      images: [{ url: OG_IMAGE_URL, width: 2130, height: 1200, alt: ogAlt, type: 'image/png' }],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@simdotai',
      creator: '@simdotai',
      title,
      description,
      images: { url: OG_IMAGE_URL, alt: twitterAlt },
    },
    alternates: { canonical: url, languages: { 'en-US': url, 'x-default': url } },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
    },
    category: 'technology',
  }
}

export function withFilteredNoindex(metadata: Metadata, isFiltered: boolean): Metadata {
  return { ...metadata, ...(isFiltered && { robots: { index: false, follow: true } }) }
}
