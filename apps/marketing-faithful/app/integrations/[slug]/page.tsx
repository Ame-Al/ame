import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { INTEGRATIONS } from '../../../adapters/integration-data'

export const dynamicParams = false

export function generateStaticParams() {
  return INTEGRATIONS.map((integration) => ({ slug: integration.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const integration = INTEGRATIONS.find((item) => item.slug === slug)
  if (!integration) return {}
  return {
    title: `${integration.name} Integration | Ame`,
    description: integration.description,
  }
}

export default async function IntegrationDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const integration = INTEGRATIONS.find((item) => item.slug === slug)
  if (!integration) notFound()
  const tools = integration.operations ?? []
  const triggers = integration.triggers ?? []

  return (
    <main id='main-content' className='bg-[var(--bg)] pt-[112px]'>
      <article className='mx-auto w-full max-w-[1040px] px-6 pb-20 sm:px-12'>
        <Link
          href='/integrations'
          className='inline-flex text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)]'
        >
          ← Back to integrations
        </Link>
        <header className='mt-10 border-b border-[var(--border)] pb-10'>
          <div className='flex items-start gap-5'>
            <div
              className='flex size-14 items-center justify-center rounded-xl border border-[var(--border-1)] text-xl text-white'
              style={{ background: integration.bgColor }}
              aria-hidden='true'
            >
              {integration.name.charAt(0)}
            </div>
            <div>
              <p className='mb-2 text-sm text-[var(--text-muted)]'>Ame integration</p>
              <h1 className='text-balance text-[40px] text-[var(--text-primary)] leading-[100%] tracking-[-0.03em] sm:text-[56px]'>
                {integration.name}
              </h1>
              <p className='mt-4 max-w-[680px] text-[17px] text-[var(--text-muted)] leading-[150%]'>
                {integration.description}
              </p>
            </div>
          </div>
          <dl className='mt-8 flex flex-wrap gap-x-10 gap-y-4 text-sm'>
            <div>
              <dt className='text-[var(--text-subtle)]'>Authentication</dt>
              <dd className='mt-1 text-[var(--text-primary)]'>
                {integration.authType || 'Not required'}
              </dd>
            </div>
            <div>
              <dt className='text-[var(--text-subtle)]'>Available tools</dt>
              <dd className='mt-1 text-[var(--text-primary)]'>{tools.length}</dd>
            </div>
            <div>
              <dt className='text-[var(--text-subtle)]'>Triggers</dt>
              <dd className='mt-1 text-[var(--text-primary)]'>{triggers.length}</dd>
            </div>
          </dl>
        </header>
        <section className='mt-12'>
          <h2 className='text-[28px] text-[var(--text-primary)] tracking-[-0.02em]'>Tools</h2>
          <p className='mt-2 text-[var(--text-muted)]'>
            Use these actions as building blocks for agents and workflows in Ame.
          </p>
          <div className='mt-6 divide-y divide-[var(--border)] border-y border-[var(--border)]'>
            {tools.length ? (
              tools.map((tool) => (
                <div key={tool.name} className='py-5'>
                  <h3 className='text-[16px] text-[var(--text-primary)]'>{tool.name}</h3>
                  <p className='mt-1 text-sm text-[var(--text-muted)] leading-[150%]'>
                    {tool.description}
                  </p>
                </div>
              ))
            ) : (
              <p className='py-5 text-sm text-[var(--text-muted)]'>
                This integration does not expose public tool metadata.
              </p>
            )}
          </div>
        </section>
        <section className='mt-12'>
          <h2 className='text-[28px] text-[var(--text-primary)] tracking-[-0.02em]'>Triggers</h2>
          <p className='mt-2 text-[var(--text-muted)]'>
            Start a workflow when an event occurs in {integration.name}.
          </p>
          <div className='mt-6 divide-y divide-[var(--border)] border-y border-[var(--border)]'>
            {triggers.length ? (
              triggers.map((trigger) => (
                <div key={trigger.name} className='py-5'>
                  <h3 className='text-[16px] text-[var(--text-primary)]'>{trigger.name}</h3>
                  <p className='mt-1 text-sm text-[var(--text-muted)] leading-[150%]'>
                    {trigger.description}
                  </p>
                </div>
              ))
            ) : (
              <p className='py-5 text-sm text-[var(--text-muted)]'>
                No public trigger metadata is listed for this integration.
              </p>
            )}
          </div>
        </section>
        <section className='mt-14 rounded-lg border border-[var(--border)] p-7'>
          <h2 className='text-[24px] text-[var(--text-primary)] tracking-[-0.02em]'>
            Build with {integration.name}
          </h2>
          <p className='mt-2 text-[var(--text-muted)]'>
            Create an Ame account to connect this integration, design your agent, and test its
            workflow.
          </p>
          <div className='mt-5 flex flex-wrap gap-3'>
            <Link
              href='/signup'
              className='rounded-[5px] bg-[var(--text-primary)] px-3 py-2 text-sm text-[var(--bg)]'
            >
              Get started
            </Link>
            <Link
              href='/integrations'
              className='rounded-[5px] border border-[var(--border-1)] px-3 py-2 text-sm text-[var(--text-primary)]'
            >
              Browse integrations
            </Link>
          </div>
        </section>
      </article>
    </main>
  )
}
