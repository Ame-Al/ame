'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'

export interface PublicIntegrationSummary {
  type: string
  slug: string
  name: string
  description: string
  bgColor: string
  integrationType: string | null
  searchFields: readonly string[]
}

/**
 * Public catalog driven by the original generated integration data. It deliberately
 * avoids workspace UI and API imports while preserving search, facets, and routes.
 */
export function IntegrationCatalog({
  integrations,
}: {
  integrations: readonly PublicIntegrationSummary[]
}) {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<string | null>(null)
  const [requestOpen, setRequestOpen] = useState(false)
  const [requestName, setRequestName] = useState('')
  const [requestEmail, setRequestEmail] = useState('')
  const categories = useMemo(
    () =>
      [
        ...new Set(
          integrations
            .map((item) => item.integrationType)
            .filter((value): value is string => Boolean(value))
        ),
      ].sort(),
    [integrations]
  )
  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    return integrations.filter(
      (item) =>
        (!category || item.integrationType === category) &&
        (!normalized || item.searchFields.some((field) => field.includes(normalized)))
    )
  }, [category, integrations, query])
  const openRequestDraft = () => {
    if (!requestName.trim() || !requestEmail.trim()) return
    const subject = encodeURIComponent(`Ame integration request: ${requestName.trim()}`)
    const body = encodeURIComponent(
      `Requested integration: ${requestName.trim()}\nReply-to email: ${requestEmail.trim()}`
    )
    window.location.href = `mailto:galaxyoram@gmail.com?subject=${subject}&body=${body}`
  }

  return (
    <main id='main-content' className='bg-[var(--bg)] pt-[112px]'>
      <section className='mx-auto w-full max-w-[1446px] px-6 pb-10 sm:px-12'>
        <div className='mb-12 max-w-[720px]'>
          <p className='mb-3 text-sm text-[var(--text-muted)]'>Ame platform</p>
          <h1 className='text-balance text-[40px] text-[var(--text-primary)] leading-[100%] tracking-[-0.03em] sm:text-[56px]'>
            Connect every tool your agents need.
          </h1>
          <p className='mt-5 max-w-[640px] text-[17px] text-[var(--text-muted)] leading-[150%]'>
            Explore the original Ame integration catalog. Search apps, filter by category, and open
            any integration to see its supported tools and triggers.
          </p>
        </div>
        <div className='mb-6 flex flex-col gap-4 border-y border-[var(--border)] py-5 sm:flex-row sm:items-center sm:justify-between'>
          <label className='sr-only' htmlFor='integration-search'>
            Search integrations
          </label>
          <input
            id='integration-search'
            type='search'
            placeholder='Search integrations, tools, or triggers…'
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className='w-full max-w-[520px] rounded-[5px] border border-[var(--border)] bg-transparent px-3 py-2.5 text-sm text-[var(--text-primary)] outline-none placeholder:text-[var(--text-subtle)] focus:border-[var(--text-primary)]'
          />
          <button
            type='button'
            onClick={() => setRequestOpen(true)}
            className='shrink-0 rounded-[5px] border border-[var(--border-1)] px-3 py-2 text-sm text-[var(--text-primary)] hover:bg-[var(--surface-hover)]'
          >
            Request an integration
          </button>
        </div>
        <div className='mb-6 flex flex-wrap gap-2'>
          <button
            type='button'
            onClick={() => setCategory(null)}
            className={`rounded-[5px] border border-[var(--border-1)] px-3 py-1 text-sm ${!category ? 'bg-[var(--surface-active)] text-[var(--text-primary)]' : 'text-[var(--text-muted)] hover:bg-[var(--surface-hover)]'}`}
          >
            All
          </button>
          {categories.map((item) => (
            <button
              type='button'
              key={item}
              onClick={() => setCategory(category === item ? null : item)}
              className={`rounded-[5px] border border-[var(--border-1)] px-3 py-1 text-sm ${category === item ? 'bg-[var(--surface-active)] text-[var(--text-primary)]' : 'text-[var(--text-muted)] hover:bg-[var(--surface-hover)]'}`}
            >
              {item}
            </button>
          ))}
        </div>
        <p className='mb-3 text-sm text-[var(--text-muted)]'>
          {filtered.length} of {integrations.length} integrations
        </p>
        <div className='grid border border-[var(--border)] sm:grid-cols-2 lg:grid-cols-3'>
          {filtered.map((integration) => (
            <Link
              key={integration.slug}
              href={`/integrations/${integration.slug}`}
              className='group flex min-h-[168px] flex-col gap-5 border-b border-[var(--border)] p-5 transition-colors hover:bg-[var(--surface-hover)] sm:[&:nth-child(odd)]:border-r lg:[&:nth-child(3n+1)]:border-r lg:[&:nth-child(3n+2)]:border-r'
            >
              <div
                className='flex size-11 items-center justify-center rounded-xl border border-[var(--border-1)] text-[16px] text-white'
                style={{ background: integration.bgColor }}
                aria-hidden='true'
              >
                {integration.name.charAt(0)}
              </div>
              <div>
                <h2 className='text-lg text-[var(--text-primary)] tracking-[-0.02em]'>
                  {integration.name}
                </h2>
                <p className='mt-1 line-clamp-2 text-sm text-[var(--text-muted)] leading-[150%]'>
                  {integration.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
        {!filtered.length && (
          <p className='py-12 text-center text-[var(--text-muted)]'>No matching integrations.</p>
        )}
      </section>
      {requestOpen && (
        <div
          className='fixed inset-0 z-[100] flex items-center justify-center bg-black/30 p-4'
          onMouseDown={() => setRequestOpen(false)}
        >
          <section
            role='dialog'
            aria-modal='true'
            aria-labelledby='request-title'
            className='w-full max-w-[480px] rounded-lg border border-[var(--border)] bg-[var(--bg)] p-6 shadow-xl'
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className='mb-5 flex items-start justify-between'>
              <div>
                <h2 id='request-title' className='text-lg text-[var(--text-primary)]'>
                  Request an integration
                </h2>
                <p className='mt-1 text-sm text-[var(--text-muted)]'>
                  Open a prefilled email draft to Ame Support.
                </p>
              </div>
              <button
                type='button'
                onClick={() => setRequestOpen(false)}
                aria-label='Close request form'
                className='text-lg text-[var(--text-muted)]'
              >
                ×
              </button>
            </div>
            <div className='flex flex-col gap-4'>
              <input
                value={requestName}
                onChange={(event) => setRequestName(event.target.value)}
                placeholder='Integration name'
                className='rounded-[5px] border border-[var(--border)] bg-transparent px-3 py-2 outline-none'
              />
              <input
                type='email'
                value={requestEmail}
                onChange={(event) => setRequestEmail(event.target.value)}
                placeholder='Your email'
                className='rounded-[5px] border border-[var(--border)] bg-transparent px-3 py-2 outline-none'
              />
            </div>
            <div className='mt-6 flex justify-end gap-2'>
              <button
                type='button'
                onClick={() => setRequestOpen(false)}
                className='px-3 py-2 text-sm text-[var(--text-primary)]'
              >
                Cancel
              </button>
              <button
                type='button'
                disabled={!requestName.trim() || !requestEmail.trim()}
                onClick={openRequestDraft}
                className='rounded-[5px] bg-[var(--text-primary)] px-3 py-2 text-sm text-[var(--bg)] disabled:opacity-40'
              >
                Open email draft
              </button>
            </div>
          </section>
        </div>
      )}
    </main>
  )
}
