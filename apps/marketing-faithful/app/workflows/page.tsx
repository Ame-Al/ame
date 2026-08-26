import type { Metadata } from 'next'
import Workflows, {
  WORKFLOWS_PAGE_DESCRIPTION,
} from '../../../sim/app/(landing)/workflows/workflows'

export const revalidate = 3600
export const metadata: Metadata = {
  title: 'AI Workflow Builder for Agents and Teams | Ame',
  description: WORKFLOWS_PAGE_DESCRIPTION,
}

export default function Page() {
  return <Workflows />
}
