import type { TUnit } from '../lib/units';
import { wrap } from '../lib/utils';
import type { Range } from '../range/Range';


export type TAxisBehavior = 'none' | 'clamp' | 'wrap';

export interface TAxisOptions {
  name: string;
  direction: string;
  unit: TUnit;
  range: Range;
  behavior?: TAxisBehavior;
}

export interface TAxisStringOptions {
  showUnit?: boolean;
}


export class Axis {
  public readonly name: string;
  public readonly direction: string;
  public readonly unit: TUnit;
  public readonly range: Range;
  public readonly behavior: TAxisBehavior;

  public constructor ( { name, direction, unit, range, behavior = 'none' }: TAxisOptions ) {
    this.name = name, this.direction = direction, this.unit = unit;
    this.range = range, this.behavior = behavior;
  }

  public initialize ( value: number ) : number {
    if ( this.behavior === 'clamp' ) return this.range.clamp( value );

    if ( this.behavior === 'wrap' && this.range.min !== null && this.range.max !== null )
      return wrap( value, this.range.min, this.range.max );

    return value;
  }

  public equals ( { name, direction, unit, range, behavior }: Axis ) : boolean {
    return this.name === name && this.direction === direction && this.unit.name === unit.name &&
    this.unit.symbol === unit.symbol && this.range.equals( range ) && this.behavior === behavior;
  }

  public clone () : Axis {
    return new Axis( { ...this.toJSON(), range: this.range.clone() } );
  }

  public toJSON () : TAxisOptions {
    return {
      name: this.name, direction: this.direction, unit: this.unit,
      range: this.range, behavior: this.behavior
    };
  }

  public toString ( { showUnit = true }: TAxisStringOptions = {} ) : string {
    return `${ this.name }${ showUnit ? ` [${ this.unit.symbol }]` : '' }`;
  }
}
