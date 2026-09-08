export interface RangeProps {
  readonly min?: number;
  readonly max?: number;
  readonly minInclusive?: boolean;
  readonly maxInclusive?: boolean;
}


export class Range {
  public readonly min: number;
  public readonly max: number;
  public readonly minInclusive: boolean;
  public readonly maxInclusive: boolean;

  public constructor ( { min = -Infinity, max = Infinity, minInclusive = true, maxInclusive = true }: RangeProps = {} ) {
    if ( min > max ) throw new Error( `Range: min (${min}) cannot be greater than max (${max})` );

    this.min = min;
    this.max = max;
    this.minInclusive = minInclusive;
    this.maxInclusive = maxInclusive;
  }
}
