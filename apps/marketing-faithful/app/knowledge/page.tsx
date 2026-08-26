import type { Metadata } from 'next'
import Knowledge, {
  KNOWLEDGE_PAGE_DESCRIPTION,
} from '../../../sim/app/(landing)/knowledge/knowledge'

export const revalidate = 3600
export const metadata: Metadata = {
  title: 'Knowledge Base for AI Agents: Memory & Citations | Ame',
  description: KNOWLEDGE_PAGE_DESCRIPTION,
}

export default function Page() {
  return <Knowledge />
}
