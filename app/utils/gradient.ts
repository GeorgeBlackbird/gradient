import type { GradientConfig } from '~/types/gradient'

export const createGradientCss = (gradient: GradientConfig) => {
  const stops = [...gradient.stops]
    .sort((a, b) => a.position - b.position)
    .map((stop) => `${stop.color} ${stop.position}%`)
    .join(', ')

  switch (gradient.type) {
    case 'linear':
      return `
        linear-gradient(
          ${gradient.angle}deg,
          ${stops}
        )
      `

    case 'radial':
      return `
        radial-gradient(
          circle,
          ${stops}
        )
      `

    case 'conic':
      return `
        conic-gradient(
          from ${gradient.angle}deg,
          ${stops}
        )
      `
  }
}
