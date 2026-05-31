import { describe, expect, it } from 'vitest'

import { generateGradient } from '../utils/generateGradient'

describe('generateGradient', () => {
  it('creates gradient', () => {
    const gradient = generateGradient()

    expect(gradient.stops.length).toBeGreaterThanOrEqual(2)

    expect(gradient.stops.length).toBeLessThanOrEqual(4)
  })

  it('positions are valid', () => {
    const gradient = generateGradient()

    gradient.stops.forEach((stop) => {
      expect(stop.position).toBeGreaterThanOrEqual(0)

      expect(stop.position).toBeLessThanOrEqual(100)
    })
  })

  it('angle is valid', () => {
    const gradient = generateGradient()

    expect(gradient.angle).toBeGreaterThanOrEqual(0)

    expect(gradient.angle).toBeLessThanOrEqual(360)
  })

  it('works fast', () => {
    const start = performance.now()

    for (let i = 0; i < 1000; i++) {
      generateGradient()
    }

    const elapsed = performance.now() - start

    expect(elapsed).toBeLessThan(100)
  })
})
