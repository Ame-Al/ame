import type { Metadata } from 'next'
import Files, { FILES_PAGE_DESCRIPTION } from '../../../sim/app/(landing)/files/files'

export const revalidate = 3600
export const metadata: Metadata = {
  title: 'File Storage for AI Agents and Your Team | Ame',
  description: FILES_PAGE_DESCRIPTION,
}

export default function Page() {
  return <Files />
}
