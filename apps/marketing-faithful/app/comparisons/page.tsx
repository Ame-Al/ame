import type { Metadata } from 'next'
import Link from 'next/link'
import { COMPARISON_PROFILES } from '../../adapters/compare-data'

export const metadata: Metadata = {
  title: 'Compare Ame to Other AI Agent Platforms',
  description:
    'Compare Ame with leading AI agent and workflow platforms using sourced platform, AI, integration, pricing, security, and support facts.',
}

export default function ComparisonsPage() {
  return (
    <main id='main-content' className='bg-[var(--bg)] pt-[112px]'>
      <section className='mx-auto w-full max-w-[1446px] px-6 pb-20 sm:px-12'>
        <div className='max-w-[820px]'>
          <p className='mb-3 text-sm text-[var(--text-muted)]'>Ame research</p>
          <h1 className='text-balance text-[40px] text-[var(--text-primary)] leading-[100%] tracking-[-0.03em] sm:text-[56px]'>
            Compare Ame with the tools you&apos;re evaluating.
          </h1>
          <p className='mt-5 text-[17px] text-[var(--text-muted)] leading-[150%]'>
            Explore source-backed comparisons of architecture, AI capabilities, integrations,
            pricing, security, observability, and support. Each page surfaces the original research
            data used by Ame&apos;s comparison site.
          </p>
        </div>
        <div className='mt-12 grid border border-[var(--border)] sm:grid-cols-2 lg:grid-cols-3'>
          {COMPARISON_PROFILES.map((profile) => (
            <Link
              key={profile.id}
              href={`/comparisons/${profile.id}`}
              className='group min-h-[186px] border-b border-[var(--border)] p-6 transition-colors hover:bg-[var(--surface-hover)] sm:[&:nth-child(odd)]:border-r lg:[&:nth-child(3n+1)]:border-r lg:[&:nth-child(3n+2)]:border-r'
            >
              <p className='text-sm text-[var(--text-muted)]'>Ame vs</p>
              <h2 className='mt-2 text-[24px] text-[var(--text-primary)] tracking-[-0.02em]'>
                {profile.name}
              </h2>
              <p className='mt-3 line-clamp-3 text-sm text-[var(--text-muted)] leading-[150%]'>
                {profile.oneLiner}
              </p>
              <span className='mt-5 inline-block text-sm text-[var(--text-primary)]'>
                See comparison →
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
