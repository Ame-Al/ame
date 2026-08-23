import { buildLandingMetadata } from '@/lib/landing/seo'
import Demo from '@/app/(landing)/demo/demo'

export const revalidate = 3600

const TITLE = 'Book a Demo | Ame, the AI Workspace'
const DESCRIPTION =
  'Book a demo of Ame, the AI agent workspace where teams build, deploy, and manage AI agents and workflows that connect 1,000+ integrations and every major LLM.'

export const metadata = buildLandingMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: '/demo',
})

export default function Page() {
  return <Demo />
}
