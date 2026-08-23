import { SITE_URL } from '@/lib/core/utils/urls'
import { JsonLd } from '@/app/(landing)/components/json-ld'

const SITE_JSON_LD = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}#organization`,
      name: 'Ame',
      alternateName: 'Ame',
      description:
        'Ame is an open-source AI workspace based in Oran, Algeria, where teams build, deploy, and manage AI agents. Connect 1,000+ integrations and every major LLM to create agents that automate real work.',
      url: SITE_URL,
      foundingDate: '2025',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Oran',
        addressCountry: 'DZ',
      },
      logo: {
        '@type': 'ImageObject',
        '@id': `${SITE_URL}#logo`,
        url: `${SITE_URL}/logo/ame-landing.svg`,
        contentUrl: `${SITE_URL}/logo/ame-landing.svg`,
        width: 49.78314,
        height: 24.276,
        caption: 'Ame Logo',
      },
      image: { '@id': `${SITE_URL}#logo` },
      brand: { '@type': 'Brand', name: 'Ame' },
      sameAs: [
        'https://x.com/simdotai',
        'https://github.com/simstudioai/sim',
        'https://www.linkedin.com/company/simstudioai/',
        'https://join.slack.com/t/sim-ott9864/shared_invite/zt-43lp8tc5v-0qrrqHGBKUsvQlpoouH~TA',
      ],
      contactPoint: [
        {
          '@type': 'ContactPoint',
          contactType: 'customer support',
          url: `${SITE_URL}/contact`,
          availableLanguage: ['en'],
        },
        {
          '@type': 'ContactPoint',
          contactType: 'sales',
          url: `${SITE_URL}/contact`,
          availableLanguage: ['en'],
        },
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}#website`,
      url: SITE_URL,
      name: 'Ame, The AI Workspace | Build, Deploy & Manage AI Agents',
      description:
        'Ame is an open-source AI workspace based in Oran, Algeria, where teams build, deploy, and manage AI agents. Connect 1,000+ integrations and every major LLM.',
      publisher: { '@id': `${SITE_URL}#organization` },
      inLanguage: 'en-US',
    },
  ],
}

/**
 * Site-wide JSON-LD - the `Organization` and `WebSite` entities that are true on
 * every landing-family page. Rendered once by the shared landing layout (via
 * {@link LandingShell}), server-side before any visible content, so crawlers and
 * AI answer engines read the canonical site graph first.
 *
 * Page-specific schema (WebPage, BreadcrumbList, Article, Product, FAQ, …) lives
 * on each page and references these entities by `@id`. The canonical `@id` form
 * is `${SITE_URL}#organization` / `${SITE_URL}#website` (no slash before the
 * fragment) - every per-page emitter (platform, solutions, pricing, home) points
 * `isPartOf`/`publisher`/`about` at these exact ids, so the graph resolves.
 *
   * Maintenance: `sameAs` must match the Footer social links. Legal contact
   * details are maintained separately in the terms and privacy-policy surfaces.
 */
export function SiteStructuredData() {
  return <JsonLd data={SITE_JSON_LD} />
}
