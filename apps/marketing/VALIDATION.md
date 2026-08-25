# Local validation

The standalone marketing site was served from `apps/marketing` through a basic local static server. Browser verification at `http://localhost:4173/` confirmed the page title, Ame wordmark, public navigation, hero imagery, product preview, feature imagery, Oran contact copy, privacy/terms links, and source/documentation links render without the Next.js application, API routes, authentication providers, database, Redis, realtime, PII service, or worker processes.

The final Vercel layout keeps `index.html`, route directories, `styles.css`, and the `landing` asset directory at the marketing root. The manifest explicitly selects Vercel's `Other` framework with no install command, no build command, and the current directory as output, eliminating Turbopack and the monorepo install from this deployment path.

## Production verification

Commit `d2be3062e7b85ef04dede7ec0fa0483aa92778cf` completed successfully on Vercel at `https://ame-8gp9wqrfg-ame-9e7a.vercel.app`. After deployment protection was removed for this marketing project, unauthenticated HTTP checks returned `200` for `/`, `/privacy/`, and `/terms/`. The hero image at `/landing/hero-platform-ui.png` returned `200` with `Cache-Control: public, max-age=31536000, immutable`.

Browser verification confirmed the public homepage title is `Ame — The AI workspace`; it renders the Ame wordmark, platform hero imagery, Oran context, Bel-Air contact information, the support email, and public navigation without the authenticated application shell.

The temporary sandbox proxy host was rejected by Vite's host allowlist. This is a local-preview-only behavior and does not affect the static Vercel deployment target, which serves the directory directly without Vite.
