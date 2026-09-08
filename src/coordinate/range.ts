import { clamp } from '../math/clamp';


export interface RangeConfig {
  readonly min?: number
  readonly max?: number
  readonly minInclusive?: boolean
  readonly maxInclusive?: boolean
}
