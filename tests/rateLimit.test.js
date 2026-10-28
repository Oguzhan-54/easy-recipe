import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

// Replace Upstash: the test decides which limiter says "no" (prefix ends with :ip or :day)
const blocked = new Set()
vi.mock('@upstash/redis', () => ({ Redis: { fromEnv: () => ({}) } }))
vi.mock('@upstash/ratelimit', () => ({
  Ratelimit: class {
    static slidingWindow() {}
    static fixedWindow() {}
    constructor({ prefix }) {
      this.type = prefix.split(':').at(-1)
    }
    async limit() {
      if (blocked.has('down')) throw new Error('Upstash not reachable')
      return { success: !blocked.has(this.type) }
    }
  },
}))

const { checkRateLimit } = await import('../api/_lib/rateLimit.js')

describe('checkRateLimit', () => {
  beforeEach(() => {
    blocked.clear()
    vi.stubEnv('UPSTASH_REDIS_REST_URL', 'https://example.upstash.io')
    vi.stubEnv('UPSTASH_REDIS_REST_TOKEN', 'token')
    vi.spyOn(console, 'error').mockImplementation(() => {})
  })
  afterEach(() => vi.unstubAllEnvs())

  it('lets a request through when no limit is reached', async () => {
    expect(await checkRateLimit('1.2.3.4')).toBeNull()
  })

  it('blocks when the limit per IP is reached', async () => {
    blocked.add('ip')
    expect((await checkRateLimit('1.2.3.4')).code).toBe('RATE_LIMITED')
  })

  it('blocks when the daily limit is reached', async () => {
    blocked.add('day')
    expect((await checkRateLimit('1.2.3.4')).code).toBe('DAILY_LIMIT_REACHED')
  })

  it('skips the limit locally without Upstash, but blocks in production', async () => {
    vi.stubEnv('UPSTASH_REDIS_REST_URL', '')
    expect(await checkRateLimit('1.2.3.4')).toBeNull()
    vi.stubEnv('VERCEL_ENV', 'production')
    expect((await checkRateLimit('1.2.3.4')).code).toBe(
      'RATE_LIMIT_UNAVAILABLE',
    )
  })

  it('lets requests through locally when Upstash fails, but blocks in production', async () => {
    blocked.add('down')
    expect(await checkRateLimit('1.2.3.4')).toBeNull()
    vi.stubEnv('VERCEL_ENV', 'production')
    expect((await checkRateLimit('1.2.3.4')).code).toBe(
      'RATE_LIMIT_UNAVAILABLE',
    )
  })
})
