export interface TRangeOptions {
  min?: number | null;
  max?: number | null;
  minInclusive?: boolean;
  maxInclusive?: boolean;
}


export class Range {
  public readonly min: number | null;
  public readonly max: number | null;
  public readonly minInclusive: boolean;
  public readonly maxInclusive: boolean;

  public constructor ( { min = null, max = null, minInclusive = true, maxInclusive = true }: TRangeOptions = {} ) {
    this.min = min, this.max = max, this.minInclusive = minInclusive, this.maxInclusive = maxInclusive;
  }
}
