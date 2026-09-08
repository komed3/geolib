export interface IRange {
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

  public constructor ( { min = -Infinity, max = Infinity, minInclusive = true, maxInclusive = true }: IRange = {} ) {
    if ( min > max ) throw new Error( `Range: min (${ min }) cannot be greater than max (${ max })` );

    this.min = min, this.max = max;
    this.minInclusive = minInclusive;
    this.maxInclusive = maxInclusive;
  }

  public contains ( value: number ) : boolean {
    return this.minInclusive ? value >= this.min : value > this.min &&
      this.maxInclusive ? value <= this.max : value < this.max;
  }

  public clamp ( value: number ) : number {
    return value < this.min ? this.min : value > this.max ? this.max : value;
  }

  public get bounded () : boolean {
    return this.min !== -Infinity || this.max !== Infinity;
  }

  public get size () : number {
    return this.max - this.min;
  }

  public equals ( range: Range ) : boolean {
    return this.min === range.min && this.max === range.max &&
      this.minInclusive === range.minInclusive &&
      this.maxInclusive === range.maxInclusive;
  }

  public toString () : string {
    return `${ this.minInclusive ? '[' : '(' }${ this.min }, ${ this.max }${ this.maxInclusive ? ']' : ')' }`;
  }
}
