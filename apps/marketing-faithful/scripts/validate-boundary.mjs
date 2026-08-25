import fs from 'node:fs'
import path from 'node:path'

const root = '/home/ubuntu/ame-github-export/apps/marketing-faithful'
const checks = [
  {
    label: 'Faithful route uses original landing composition',
    file: 'app/page.tsx',
    required: [
      "../../sim/app/(landing)/components/landing-shell/landing-shell",
      "../../sim/app/(landing)/landing",
    ],
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

if (failures.length) {
  console.error('Faithful marketing boundary validation failed:')
  failures.forEach((failure) => console.error(`- ${failure}`))
  process.exit(1)
}

console.log(`Faithful marketing boundary validated: original composition, styles, safe adapters, and ${assetCount} landing assets.`)
