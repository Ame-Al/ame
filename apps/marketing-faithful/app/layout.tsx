// Faithful marketing root: imports the original landing token system and font, without the authenticated workspace providers from apps/sim/app/layout.tsx.
import type { Metadata, Viewport } from 'next'
import { season } from '../../sim/app/_styles/fonts/season/season'
import '../../sim/app/_styles/globals.css'
import { LandingShell } from '../../sim/app/(landing)/components/landing-shell/landing-shell'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ffffff',
}

export const metadata: Metadata = {
  title: 'The AI Workspace | Build, Deploy & Manage AI Agents | Ame',
  description:
    'Ame is the open-source AI workspace where teams build, deploy, and manage AI agents.',
}

export default function MarketingRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={`${season.variable} font-season`}>
        <LandingShell>{children}</LandingShell>
      </body>
    </html>
  )
}
