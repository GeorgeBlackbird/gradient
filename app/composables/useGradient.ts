import { computed } from 'vue'
import type { GradientConfig, GradientStop } from '~/types/gradient'
import { generateGradient } from '~/utils/generateGradient'

const DEFAULT_GRADIENT: GradientConfig = {
  type: 'linear',

  angle: 135,

  stops: [
    {
      id: crypto.randomUUID(),
      color: '#ff6b6b',
      position: 0,
    },
    {
      id: crypto.randomUUID(),
      color: '#4ecdc4',
      position: 100,
    },
  ],
}

export const useGradient = () => {
  const gradient = useLocalStorage<GradientConfig>('gradient', structuredClone(DEFAULT_GRADIENT))

  const sortedStops = computed(() => {
    return [...gradient.value.stops].sort((a, b) => a.position - b.position)
  })

  const stopsCss = computed(() => {
    return sortedStops.value.map((stop) => `${stop.color} ${stop.position}%`).join(', ')
  })

  const css = computed(() => {
    switch (gradient.value.type) {
      case 'linear':
        return `linear-gradient(
          ${gradient.value.angle}deg,
          ${stopsCss.value}
        )`

      case 'radial':
        return `radial-gradient(
          circle,
          ${stopsCss.value}
        )`

      case 'conic':
        return `conic-gradient(
            from ${gradient.value.angle}deg,
            ${stopsCss.value}
        )`

      default:
        return ''
    }
  })

  const cssDeclaration = computed(() => {
    return `background: ${css.value};`
  })

  const addStop = (color: string, position: number) => {
    gradient.value.stops.push({
      id: crypto.randomUUID(),
      color,
      position,
    })
  }

  const removeStop = (id: string) => {
    if (gradient.value.stops.length <= 2) {
      return
    }

    gradient.value.stops = gradient.value.stops.filter((stop) => stop.id !== id)
  }

  const updateStop = (id: string, payload: Partial<GradientStop>) => {
    const stop = gradient.value.stops.find((stop) => stop.id === id)

    if (!stop) {
      return
    }

    Object.assign(stop, payload)
  }

  const updateAngle = (angle: number) => {
    gradient.value.angle = angle
  }

  const generateRandomGradient = () => {
    gradient.value = generateGradient()
  }

  const reset = () => {
    gradient.value = structuredClone(DEFAULT_GRADIENT)
  }

  return {
    gradient,

    sortedStops,

    css,
    cssDeclaration,

    addStop,
    removeStop,
    updateStop,

    updateAngle,

    generateRandomGradient,

    reset,
  }
}
