import { clamp } from '../math/clamp';


export interface RangeConfig {
  readonly min?: number;
  readonly max?: number;
  readonly minInclusive?: boolean;
  readonly maxInclusive?: boolean;
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

  public contains ( value: number ) : boolean {
    return this.minInclusive ? value >= this.min : value > this.min &&
      this.maxInclusive ? value <= this.max : value < this.max;
  }

  public clamp ( value: number ) : number {
    return clamp( value, this.min, this.max );
  }

  public get size () : number {
    return this.max - this.min;
  }

  public get bounded () : boolean {
    return Number.isFinite( this.min ) && Number.isFinite( this.max );
  }

  public get empty () : boolean {
    return this.min === this.max && ( ! this.minInclusive || ! this.maxInclusive );
  }

  public equals ( other: Range ) : boolean {
    return this.min === other.min && this.max === other.max &&
      this.minInclusive === other.minInclusive && this.maxInclusive === other.maxInclusive;
  }
}
