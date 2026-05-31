export type GradientType =
  | 'linear'
  | 'radial'
  | 'conic'

export interface GradientStop {
  id: string

  /**
   * #ffffff
   * rgb(...)
   * hsl(...)
   */
  color: string

  /**
   * 0-100
   */
  position: number
}

export interface GradientConfig {
  type: GradientType

  /**
   * for linear-gradient
   */
  angle: number

  stops: GradientStop[]
}
