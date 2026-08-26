import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  AME_PROFILE,
  COMPARISON_PROFILES,
  getComparisonProfile,
  humanizeKey,
} from '../../../adapters/compare-data'

type ComparisonFact = {
  value: string
  detail?: string
  confidence: string
  sources: Array<{ url: string; label: string; asOf: string }>
}

export const dynamicParams = false

export function generateStaticParams() {
  return COMPARISON_PROFILES.map((profile) => ({ provider: profile.id }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ provider: string }>
}): Promise<Metadata> {
  const { provider } = await params
  const profile = getComparisonProfile(provider)
  if (!profile) return {}
  return {
    title: `Ame vs ${profile.name} | Ame`,
    description: `Compare Ame and ${profile.name} on sourced platform, AI, integration, pricing, security, observability, and support facts.`,
  }
}

export default async function ComparisonDetailPage({
  params,
}: {
  params: Promise<{ provider: string }>
}) {
  const { provider } = await params
  const profile = getComparisonProfile(provider)
  if (!profile) notFound()
  const sections = Object.entries(profile.facts) as Array<[string, Record<string, ComparisonFact>]>

  return (
    <main id='main-content' className='bg-[var(--bg)] pt-[112px]'>
      <article className='mx-auto w-full max-w-[1180px] px-6 pb-20 sm:px-12'>
        <Link
          href='/comparisons'
          className='inline-flex text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)]'
        >
          ← Back to comparisons
        </Link>
        <header className='mt-10 max-w-[820px]'>
          <p className='text-sm text-[var(--text-muted)]'>Ame comparison</p>
          <h1 className='mt-3 text-balance text-[40px] text-[var(--text-primary)] leading-[100%] tracking-[-0.03em] sm:text-[56px]'>
            Ame vs {profile.name}
          </h1>
          <p className='mt-5 text-[17px] text-[var(--text-muted)] leading-[150%]'>
            Compare Ame with {profile.name} across the capabilities that matter when building,
            deploying, and governing AI agents. Every competitor fact includes the original research
            source and verification date.
          </p>
        </header>
        <section className='mt-12 grid gap-5 border-y border-[var(--border)] py-8 sm:grid-cols-2'>
          <div>
            <h2 className='text-lg text-[var(--text-primary)]'>Ame</h2>
            <p className='mt-2 text-sm text-[var(--text-muted)]'>{AME_PROFILE.oneLiner}</p>
          </div>
          <div>
            <h2 className='text-lg text-[var(--text-primary)]'>{profile.name}</h2>
            <p className='mt-2 text-sm text-[var(--text-muted)]'>{profile.oneLiner}</p>
            <a
              href={profile.website}
              target='_blank'
              rel='noreferrer'
              className='mt-3 inline-block text-sm text-[var(--text-primary)] underline'
            >
              Visit {profile.name}
            </a>
          </div>
        </section>
        <div className='mt-12 space-y-12'>
          {sections.map(([section, facts]) => (
            <section key={section}>
              <h2 className='text-[28px] text-[var(--text-primary)] tracking-[-0.02em]'>
                {humanizeKey(section)}
              </h2>
              <div className='mt-5 overflow-x-auto border border-[var(--border)]'>
                <table className='w-full min-w-[700px] text-left text-sm'>
                  <thead className='border-b border-[var(--border)] text-[var(--text-muted)]'>
                    <tr>
                      <th className='px-4 py-3 font-normal'>Capability</th>
                      <th className='px-4 py-3 font-normal'>Ame</th>
                      <th className='px-4 py-3 font-normal'>{profile.name}</th>
                      <th className='px-4 py-3 font-normal'>Source</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(facts).map(([key, fact]) => {
                      const ameFact = (
                        AME_PROFILE.facts as unknown as Record<
                          string,
                          Record<string, { value: string }>
                        >
                      )[section]?.[key]
                      const source = fact.sources?.[0]
                      return (
                        <tr
                          key={key}
                          className='border-b border-[var(--border)] last:border-b-0 align-top'
                        >
                          <th
                            scope='row'
                            className='px-4 py-4 font-medium text-[var(--text-primary)]'
                          >
                            {humanizeKey(key)}
                          </th>
                          <td className='px-4 py-4 text-[var(--text-muted)]'>
                            {ameFact?.value ?? '—'}
                          </td>
                          <td className='px-4 py-4 text-[var(--text-muted)]'>
                            <p>{fact.value}</p>
                            {fact.detail && <p className='mt-1 text-xs'>{fact.detail}</p>}
                          </td>
                          <td className='px-4 py-4'>
                            {source ? (
                              <a
                                href={source.url}
                                target='_blank'
                                rel='noreferrer'
                                className='text-[var(--text-primary)] underline'
                              >
                                {source.label}
                                <span className='block pt-1 text-xs text-[var(--text-subtle)]'>
                                  {source.asOf}
                                </span>
                              </a>
                            ) : (
                              <span className='text-[var(--text-subtle)]'>{fact.confidence}</span>
                            )}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </section>
          ))}
        </div>
      </article>
    </main>
  )
}
