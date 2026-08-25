# Faithful Ame Marketing Target

This is a **separate Next.js deployment target** for the original Ame landing experience. It deliberately imports the original landing shell, homepage composition, components, token system, product loops, CSS, and assets from `apps/sim`, rather than redesigning them.

Only runtime seams that are non-visual and unsafe for a standalone public marketing site are locally adapted: hosted tracking flags, GitHub-star lookup, landing analytics, and footer catalog lists. The authenticated workspace, API routes, database, Redis, realtime service, PII service, cron scheduler, and workers remain out of scope.

The existing `apps/marketing` static site remains an unchanged fallback. This faithful target must be configured as a distinct Vercel project with root directory `apps/marketing-faithful` and **Include source files outside of the Root Directory in the Build Step** enabled.
