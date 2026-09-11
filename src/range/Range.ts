import { clamp } from '../utils';


export interface TRangeOptions {
  min?: number | null;
  max?: number | null;
  minInclusive?: boolean;
  maxInclusive?: boolean;
}

export interface TRangeStringOptions {
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

  public clamp ( value: number ) : number {
    return clamp( value, this.min ?? -Infinity, this.max ?? Infinity );
  }

  public equals ( { min, max, minInclusive, maxInclusive }: Range ) : boolean {
    return this.min === min && this.max === max && this.minInclusive === minInclusive &&
      this.maxInclusive === maxInclusive;
  }

  public clone () : Range {
    return new Range( this.toJSON() );
  }

  public toJSON () : TRangeOptions {
    return {
      min: this.min, max: this.max, minInclusive: this.minInclusive,
      maxInclusive: this.maxInclusive
    };
  }

  public toString ( { locale = 'en', precision = 22 }: TRangeStringOptions = {} ) : string {
    const f = Intl.NumberFormat( locale, { maximumFractionDigits: precision } );
    const min = this.min === null ? '-∞' : f.format( this.min );
    const max = this.max === null ? '∞' : f.format( this.max );

    return `${ this.minInclusive ? '[' : '(' }${ min }, ${ max }${ this.maxInclusive ? ']' : ')' }`;
  }
}
