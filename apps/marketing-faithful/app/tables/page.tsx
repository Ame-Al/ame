import type { Metadata } from 'next'
import Tables, { TABLES_PAGE_DESCRIPTION } from '../../../sim/app/(landing)/tables/tables'

export const revalidate = 3600
export const metadata: Metadata = {
  title: 'AI Agent Database: Tables for Structured Data | Ame',
  description: TABLES_PAGE_DESCRIPTION,
}

export default function Page() {
  return <Tables />
}
