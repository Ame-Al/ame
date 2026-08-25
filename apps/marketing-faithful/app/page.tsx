// Faithful marketing route: reuse the original shell and landing composition, not a replacement layout.
import { LandingShell } from '../../sim/app/(landing)/components/landing-shell/landing-shell'
import Landing from '../../sim/app/(landing)/landing'

export default async function MarketingHomePage() {
  return (
    <LandingShell>
      <Landing />
    </LandingShell>
  )
}
