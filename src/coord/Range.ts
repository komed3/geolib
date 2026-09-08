export interface TRangeOptions {
  min?: number | null;
  max?: number | null;
  minInclusive?: boolean;
  maxInclusive?: boolean;
}

export interface RangeStringOptions {
  locale?: string;
  precision?: number;
}


export class Range {
  public readonly min: number | null;
  public readonly max: number | null;
  public readonly minInclusive: boolean;
  public readonly maxInclusive: boolean;

  public constructor ( { min = null, max = null, minInclusive = true, maxInclusive = true }: TRangeOptions = {} ) {
    this.min = min, this.max = max, this.minInclusive = minInclusive, this.maxInclusive = maxInclusive;
  }

  public contains ( value: number ) : boolean {
    const minValid = this.min === null || ( this.minInclusive ? value >= this.min : value > this.min );
    const maxValid = this.max === null || ( this.maxInclusive ? value <= this.max : value < this.max );

    return minValid && maxValid;
  }

  public equals ( range: Range ) : boolean {
    return this.min === range.min && this.max === range.max &&
      this.minInclusive === range.minInclusive &&
      this.maxInclusive === range.maxInclusive;
  }

  public toString ( { locale = 'en', precision = 22 }: RangeStringOptions ) : string {
    const f = Intl.NumberFormat( locale, { maximumFractionDigits: precision } );
    const min = this.min === null ? '-∞' : f.format( this.min );
    const max = this.max === null ? '∞' : f.format( this.max );

    return `${ this.minInclusive ? '[' : '(' }${ min }, ${ max }${ this.maxInclusive ? ']' : ')' }`;
  }
}
