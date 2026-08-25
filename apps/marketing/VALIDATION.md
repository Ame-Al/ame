# Local validation

The standalone marketing site was served from `apps/marketing` through a basic local static server. Browser verification at `http://localhost:4173/` confirmed the page title, Ame wordmark, public navigation, hero imagery, product preview, feature imagery, Oran contact copy, privacy/terms links, and source/documentation links render without the Next.js application, API routes, authentication providers, database, Redis, realtime, PII service, or worker processes.

The final Vercel layout keeps `index.html`, route directories, `styles.css`, and the `landing` asset directory at the marketing root. The manifest explicitly selects Vercel's `Other` framework with no install command, no build command, and the current directory as output, eliminating Turbopack and the monorepo install from this deployment path.

The temporary sandbox proxy host was rejected by Vite's host allowlist. This is a local-preview-only behavior and does not affect the static Vercel deployment target, which serves the directory directly without Vite.
