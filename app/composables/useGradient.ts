import { ref, computed, onMounted, watch } from 'vue'
import type { GradientConfig, GradientStop, SavedGradient } from '~/types/gradient'
import { generateGradient } from '~/utils/generateGradient'
import { createGradientCss } from '~/utils/gradient'

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
  const gradient = useState<GradientConfig>('current-gradient', () =>
    structuredClone(DEFAULT_GRADIENT),
  )
  const favorites = useState<SavedGradient[]>('gradient-favorites', () => [])

  onMounted(() => {
    const localGradient = localStorage.getItem('gradient')
    if (localGradient) {
      try {
        gradient.value = JSON.parse(localGradient)
      } catch (e) {
        console.error('Error parsing gradient from localStorage', e)
      }
    }

    const localFavorites = localStorage.getItem('gradient-favorites')
    if (localFavorites) {
      try {
        favorites.value = JSON.parse(localFavorites)
      } catch (e) {
        console.error('Error parsing gradient favorites from localStorage', e)
      }
    }

    watch(
      gradient,
      (newVal) => {
        localStorage.setItem('gradient', JSON.stringify(newVal))
      },
      { deep: true },
    )

    watch(
      favorites,
      (newVal) => {
        localStorage.setItem('gradient-favorites', JSON.stringify(newVal))
      },
      { deep: true },
    )
  })

  const sortedStops = computed(() => {
    return [...gradient.value.stops].sort((a, b) => a.position - b.position)
  })

  const stopsCss = computed(() => {
    return sortedStops.value.map((stop) => `${stop.color} ${stop.position}%`).join(', ')
  })

  const css = computed(() => createGradientCss(gradient.value))

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

  const cloneGradient = (gradient: GradientConfig): GradientConfig => {
    return structuredClone(gradient)
  }

  const MAX_FAVORITES = 50
  const saveToFavorites = () => {
    favorites.value.unshift({
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      gradient: cloneGradient(gradient.value),
    })

    favorites.value = favorites.value.slice(0, MAX_FAVORITES)
  }

  const removeFavorite = (id: string) => {
    favorites.value = favorites.value.filter((item) => item.id !== id)
  }

  const applyFavorite = (id: string) => {
    const favorite = favorites.value.find((item) => item.id === id)

    if (!favorite) {
      return
    }

    gradient.value = cloneGradient(favorite.gradient)
  }

  const isFavorite = computed(() => {
    const current = JSON.stringify(gradient.value)

    return favorites.value.some((item) => JSON.stringify(item.gradient) === current)
  })

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

    favorites,
    saveToFavorites,
    removeFavorite,
    applyFavorite,
    isFavorite,

    reset,
  }
}
