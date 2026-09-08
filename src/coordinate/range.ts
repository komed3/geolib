import { clamp } from '../math/clamp';


export interface RangeConfig {
  readonly min?: number
  readonly max?: number
  readonly minInclusive?: boolean
  readonly maxInclusive?: boolean
}


export class Range {
  readonly min: number
  readonly max: number
  readonly minInclusive: boolean
  readonly maxInclusive: boolean

  constructor ( { min = -Infinity, max = Infinity, minInclusive = true, maxInclusive = true }: RangeConfig = {} ) {
    if ( min > max ) throw new RangeError( 'Range minimum must not exceed maximum' );

    this.min = min;
    this.max = max;
    this.minInclusive = minInclusive;
    this.maxInclusive = maxInclusive;

    Object.freeze( this );
  }
}
