// Public comparison data adapter: original authored, source-backed profiles only.
import {
  claudeCoworkProfile,
  crewaiProfile,
  dustProfile,
  flowiseProfile,
  gumloopProfile,
  langchainProfile,
  langflowProfile,
  makeProfile,
  microsoftCopilotProfile,
  n8nProfile,
  openaiAgentkitProfile,
  openClawProfile,
  pipedreamProfile,
  powerAutomateProfile,
  retoolProfile,
  simProfile,
  stackaiProfile,
  tinesProfile,
  vellumProfile,
  workatoProfile,
  zapierProfile,
} from '../../sim/lib/compare/data'

function rebrandPublicValue(value: unknown, key?: string): unknown {
  if (typeof value === 'string') {
    if (key === 'url' || key === 'website') return value
    return value.replace(/\bSim\b/g, 'Ame').replace(/\bsim\b/g, 'ame')
  }
  if (Array.isArray(value)) return value.map((item) => rebrandPublicValue(item))
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([entryKey, entryValue]) => [
        entryKey,
        rebrandPublicValue(entryValue, entryKey),
      ])
    )
  }
  return value
}

function rebrandProfile<T>(profile: T): T {
  return rebrandPublicValue(profile) as T
}

export const AME_PROFILE = { ...rebrandProfile(simProfile), name: 'Ame' }
export const COMPARISON_PROFILES = rebrandProfile([
  n8nProfile,
  zapierProfile,
  makeProfile,
  gumloopProfile,
  workatoProfile,
  retoolProfile,
  pipedreamProfile,
  openaiAgentkitProfile,
  tinesProfile,
  claudeCoworkProfile,
  crewaiProfile,
  dustProfile,
  flowiseProfile,
  langchainProfile,
  langflowProfile,
  microsoftCopilotProfile,
  openClawProfile,
  powerAutomateProfile,
  stackaiProfile,
  vellumProfile,
])

export function getComparisonProfile(slug: string) {
  return COMPARISON_PROFILES.find((profile) => profile.id === slug)
}

export function humanizeKey(key: string) {
  return key.replace(/([A-Z])/g, ' $1').replace(/^./, (letter) => letter.toUpperCase())
}
