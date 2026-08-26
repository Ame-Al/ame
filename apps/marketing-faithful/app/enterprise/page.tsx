import type { Metadata } from 'next'
import EnterprisePage, {
  ENTERPRISE_SEO_DESCRIPTION,
} from '../../../sim/app/(landing)/enterprise/enterprise'

export const revalidate = 3600
export const metadata: Metadata = {
  title: 'Enterprise AI Agent Platform | Ame',
  description: ENTERPRISE_SEO_DESCRIPTION,
}

export default function Page() {
  return <EnterprisePage />
}
