import fs from 'node:fs'
import path from 'node:path'

const root = '/home/ubuntu/ame-github-export/apps/marketing-faithful'
const checks = [
  {
    label: 'Faithful route uses original landing composition',
    file: 'app/page.tsx',
    required: ["../../sim/app/(landing)/landing"],
  },
  {
    label: 'All public routes retain the original landing shell',
    file: 'app/layout.tsx',
    required: ["../../sim/app/(landing)/components/landing-shell/landing-shell"],
  },
  {
    label: 'Only non-visual runtime seams are locally adapted',
    file: 'next.config.ts',
    required: [
      "adapters/marketing-data.ts",
      "adapters/noop-analytics.tsx",
      "adapters/ui.ts",
      "adapters/env-flags.ts",
      "adapters/github-stars.ts",
    ],
  },
  {
    label: 'Original global styling is preserved',
    file: 'app/layout.tsx',
    required: ["../../sim/app/_styles/globals.css", "../../sim/app/_styles/fonts/season/season"],
  },
  {
    label: 'Public integrations use the generated catalog adapter rather than the workspace barrel',
    file: 'app/integrations/page.tsx',
    required: ['adapters/integration-data'],
  },
  {
    label: 'Public integration details use the generated catalog adapter rather than the workspace barrel',
    file: 'app/integrations/[slug]/page.tsx',
    required: ['adapters/integration-data'],
  },
  {
    label: 'Public comparison details use the comparison data adapter',
    file: 'app/comparisons/[provider]/page.tsx',
    required: ['adapters/compare-data'],
  },
]

const failures = []
for (const check of checks) {
  const source = fs.readFileSync(path.join(root, check.file), 'utf8')
  const missing = check.required.filter((value) => !source.includes(value))
  if (missing.length) failures.push(`${check.label}: missing ${missing.join(', ')}`)
}

const landingDir = path.join(root, 'public/landing')
const assetCount = fs.existsSync(landingDir)
  ? fs.readdirSync(landingDir, { recursive: true }).filter((entry) => !entry.endsWith('/')).length
  : 0
if (assetCount < 34) failures.push(`Original landing assets incomplete: expected at least 34, found ${assetCount}`)

const requiredRouteFiles = [
  'app/enterprise/page.tsx',
  'app/workflows/page.tsx',
  'app/knowledge/page.tsx',
  'app/tables/page.tsx',
  'app/files/page.tsx',
  'app/logs/page.tsx',
  'app/integrations/page.tsx',
  'app/integrations/[slug]/page.tsx',
  'app/comparisons/page.tsx',
  'app/comparisons/[provider]/page.tsx',
  'adapters/integration-data.ts',
  'adapters/compare-data.ts',
]

for (const relativePath of requiredRouteFiles) {
  if (!fs.existsSync(path.join(root, relativePath))) {
    failures.push(`Required public route or adapter missing: ${relativePath}`)
  }
}

const excludedRouteDirectories = ['app/chat', 'app/mcp', 'app/api', 'app/self-hosting', 'app/status']
for (const relativePath of excludedRouteDirectories) {
  if (fs.existsSync(path.join(root, relativePath))) {
    failures.push(`Excluded local route must not be published: ${relativePath}`)
  }
}

if (failures.length) {
  console.error('Faithful marketing boundary validation failed:')
  failures.forEach((failure) => console.error(`- ${failure}`))
  process.exit(1)
}

console.log(`Faithful marketing boundary validated: original composition, styles, allowed public routes, safe adapters, and ${assetCount} landing assets.`)
