import catalog from '@sim/deployment-config/integrations.json'

export type PublicOperation = { name: string; description: string }
export type PublicTrigger = { name: string; description: string }
export type PublicIntegration = {
  type: string
  slug: string
  name: string
  description: string
  bgColor: string
  integrationType: string | null
  authType?: string | null
  operations: readonly PublicOperation[]
  triggers: readonly PublicTrigger[]
}

export const INTEGRATIONS = catalog.integrations as readonly PublicIntegration[]

export function toIntegrationSummary(integration: PublicIntegration) {
  return {
    type: integration.type,
    slug: integration.slug,
    name: integration.name,
    description: integration.description,
    bgColor: integration.bgColor,
    integrationType: integration.integrationType,
    searchFields: [
      integration.name.toLowerCase(),
      integration.description.toLowerCase(),
      ...integration.operations.flatMap((operation) => [
        operation.name.toLowerCase(),
        operation.description.toLowerCase(),
      ]),
      ...integration.triggers.map((trigger) => trigger.name.toLowerCase()),
    ],
  }
}
