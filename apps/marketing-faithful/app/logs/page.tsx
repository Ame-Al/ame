import type { Metadata } from 'next'
import Logs, { LOGS_PAGE_DESCRIPTION } from '../../../sim/app/(landing)/logs/logs'

export const revalidate = 3600
export const metadata: Metadata = {
  title: 'AI Agent Observability & Logs: Trace Every Run | Ame',
  description: LOGS_PAGE_DESCRIPTION,
}

export default function Page() {
  return <Logs />
}
