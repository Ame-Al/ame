# Deployment research

## Vercel monorepo boundary

Vercel’s monorepo FAQ states that a project can access source files outside its configured Root Directory when **Include source files outside of the Root Directory in the Build Step** is enabled. Projects created after August 27, 2020 have this option enabled by default, but it must be confirmed in the Vercel project settings for this target. Source: [Vercel Monorepos FAQ](https://vercel.com/docs/monorepos/monorepo-faq).

This faithful target therefore uses `apps/marketing-faithful` as its own Vercel project root while importing the original marketing source from the sibling `apps/sim` directory. The working `apps/marketing` static site remains a separate fallback deployment.

## Next.js compiler boundary

The Next.js Turbopack reference documents that files outside the project root require an absolute `turbopack.root` encompassing both the target and linked sources, and that `turbopack.resolveAlias` can replace imports with local adapters. Source: [Next.js Turbopack configuration](https://nextjs.org/docs/app/api-reference/config/next-config-js/turbopack).

The local export has a `node_modules` symlink that points outside the repository root. Turbopack rejected that symlink during the first compile gate. The same official documentation supports the Webpack fallback via `next dev --webpack` and `next build --webpack`; this faithful target uses that fallback locally and for production build reliability while retaining only original marketing components and narrowly scoped adapters.
