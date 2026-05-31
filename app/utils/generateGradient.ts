import type { GradientConfig } from '~/types/gradient'

const random = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const normalizeHue = (hue: number) => {
  return ((hue % 360) + 360) % 360
}

const createHsl = (hue: number, saturation: number, lightness: number) => {
  return `hsl(${normalizeHue(hue)} ${saturation}% ${lightness}%)`
}

export const generateGradient = (): GradientConfig => {
  const baseHue = random(0, 359)

  const angle = random(0, 360)

  const stopCount = random(2, 4)

  const paletteTypes = [
    [0, 30, 60],
    [0, 60, 120],
    [0, 120, 240],
    [0, 20, 180],
  ]

  const offsets = paletteTypes[random(0, paletteTypes.length - 1)]

  const stops = Array.from({ length: stopCount }, (_, index) => {
    const hue = baseHue + offsets[index % offsets.length]

    return {
      id: crypto.randomUUID(),

      color: createHsl(hue, random(70, 90), random(55, 72)),

      position: stopCount === 1 ? 0 : Math.round((index / (stopCount - 1)) * 100),
    }
  })

  return {
    type: 'linear',
    angle,
    stops,
  }
}
