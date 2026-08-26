import type { Metadata } from 'next'
import { IntegrationCatalog } from '../../adapters/integration-catalog'
import { INTEGRATIONS, toIntegrationSummary } from '../../adapters/integration-data'

const integrations = INTEGRATIONS.map(toIntegrationSummary)

export const metadata: Metadata = {
  title: 'Integrations | Ame AI Workspace',
  description:
    'Connect hundreds of apps and services in Ame. Build agents that automate real work with the tools your team already uses.',
}

export default function IntegrationsPage() {
  return <IntegrationCatalog integrations={integrations} />
}
