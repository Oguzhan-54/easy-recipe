import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

// Serverless functions forget everything after a request, so the counters live in
// Upstash Redis (an external key-value store) that every function instance shares.
const REQUESTS_PER_IP = 5
const IP_WINDOW = '1 h'
const REQUESTS_PER_DAY = 80

let limiters = null

function getLimiters() {
  if (!limiters) {
    // Reads UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN from process.env
    const redis = Redis.fromEnv()
    // Own counters per environment, so local tests do not use up the live limit
    const prefix = `easy-recipe:${process.env.VERCEL_ENV ?? 'local'}`
    limiters = {
      // Sliding window: always "the last 60 minutes", not "since the full hour"
      perIp: new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(REQUESTS_PER_IP, IP_WINDOW),
        prefix: `${prefix}:ip`,
      }),
      // Fixed window: one counter per day for all visitors together
      perDay: new Ratelimit({
        redis,
        limiter: Ratelimit.fixedWindow(REQUESTS_PER_DAY, '1 d'),
        prefix: `${prefix}:day`,
      }),
    }
  }
  return limiters
}

// Returns null if the request may go to the AI, otherwise { code, message }.
export async function checkRateLimit(ip) {
  const isConfigured =
    process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN

  if (!isConfigured) {
    // Live without a limit, anyone could use up the AI quota → block instead
    if (process.env.VERCEL_ENV === 'production') {
      console.error(
        'Rate limit is not configured (Upstash env variables missing)',
      )
      return limitError('RATE_LIMIT_UNAVAILABLE')
    }
    // Local development works without an Upstash account
    return null
  }

  try {
    const { perIp, perDay } = getLimiters()
    // Per IP first, so a blocked visitor does not count towards the daily limit
    const ipResult = await perIp.limit(ip)
    if (!ipResult.success) return limitError('RATE_LIMITED')
    const dayResult = await perDay.limit('all')
    if (!dayResult.success) return limitError('DAILY_LIMIT_REACHED')
    return null
  } catch (error) {
    // Upstash not reachable (or its free quota used up, which a flood of requests can cause):
    // live, block like a missing config, otherwise nothing limits the AI calls. Locally let it through.
    console.error('Rate limit check failed:', error.message)
    if (process.env.VERCEL_ENV === 'production') {
      return limitError('RATE_LIMIT_UNAVAILABLE')
    }
    return null
  }
}

const MESSAGES = {
  RATE_LIMITED: `Du hast das Limit von ${REQUESTS_PER_IP} Analysen pro Stunde erreicht. Probier solange die Beispielbilder oder versuche es später noch einmal.`,
  DAILY_LIMIT_REACHED:
    'Das Tageslimit für heute ist erreicht. Probier solange die Beispielbilder oder versuche es morgen noch einmal.',
  RATE_LIMIT_UNAVAILABLE:
    'Die Analyse ist gerade nicht verfügbar. Probier solange die Beispielbilder.',
}

function limitError(code) {
  return { code, message: MESSAGES[code] }
}
