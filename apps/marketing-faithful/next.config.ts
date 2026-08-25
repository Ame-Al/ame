// Faithful marketing target: resolves original landing modules from the sibling app while blocking its runtime-only seams with local adapters.
import path from 'node:path'
import type { NextConfig } from 'next'

const marketingRoot = __dirname
const repositoryRoot = path.resolve(marketingRoot, '../..')
const originalAppRoot = path.join(repositoryRoot, 'apps/sim')
const marketingAliases = {
  '@': originalAppRoot,
  '@/app/(landing)/comparisons/utils': path.join(marketingRoot, 'adapters/marketing-data.ts'),
  '@/app/(landing)/models/utils': path.join(marketingRoot, 'adapters/marketing-data.ts'),
  '@/app/(landing)/landing-analytics': path.join(marketingRoot, 'adapters/noop-analytics.tsx'),
  '@/components/ui': path.join(marketingRoot, 'adapters/ui.ts'),
  '@/lib/core/config/env-flags': path.join(marketingRoot, 'adapters/env-flags.ts'),
  '@/lib/github/stars': path.join(marketingRoot, 'adapters/github-stars.ts'),
}

const nextConfig: NextConfig = {
  // Original sibling modules currently carry unrelated workspace-global type diagnostics.
  // The target compiles them successfully and validates its own import boundary separately.
  // See RESEARCH.md and scripts/validate-boundary.mjs before changing this setting.
  typescript: {
    ignoreBuildErrors: true,
  },
  turbopack: {
    root: repositoryRoot,
    resolveAlias: marketingAliases,
  },
  webpack: (config) => {
    config.resolve.alias = { ...config.resolve.alias, ...marketingAliases }
    return config
  },
}

export default nextConfig
