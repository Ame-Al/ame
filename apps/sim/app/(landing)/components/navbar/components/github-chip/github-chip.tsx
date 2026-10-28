'use client'

import { ChipLink } from '@sim/emcn'
import { GithubOutlineIcon } from '@/components/icons'

/** GitHub repository link for the Ame public marketing site. */
export function GitHubChip() {
  return (
    <ChipLink
      href='https://github.com/Ame-Al/ame'
      target='_blank'
      rel='noopener noreferrer'
      leftIcon={GithubOutlineIcon}
      aria-label='GitHub repository'
    >
      GitHub
    </ChipLink>
  )
}
