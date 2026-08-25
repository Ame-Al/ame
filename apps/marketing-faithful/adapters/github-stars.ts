// Marketing adapter: preserves navbar geometry while avoiding env-schema, logger, and GitHub runtime dependencies.
export function formatStarCount(value: number): string {
  if (value < 1000) return String(value)
  const formatted = (Math.round(value / 100) / 10).toFixed(1)
  return formatted.endsWith('.0') ? `${formatted.slice(0, -2)}k` : `${formatted}k`
}

export async function getGitHubStars(): Promise<string> {
  return '29.5k'
}
