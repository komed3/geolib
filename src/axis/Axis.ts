import type { Range } from '../range';
import type { Unit, UnitStringOptions } from '../unit';
import { wrap } from '../utils';


export type AxisBehavior = 'none' | 'clamp' | 'wrap';

export interface AxisOptions {
  name: string;
  orientation: string;
  unit: Unit;
  range: Range;
  behavior?: AxisBehavior;
  abbr?: string;
}

export interface AxisStringOptions extends UnitStringOptions {
  displayUnit?: boolean;
}


export class Axis {
  public readonly name: string;
  public readonly orientation: string;
  public readonly unit: Unit;
  public readonly range: Range;
  public readonly behavior: AxisBehavior;
  public readonly abbr?: string;

  public constructor ( { name, orientation, unit, range, behavior = 'none', abbr }: AxisOptions ) {
    this.name = name, this.orientation = orientation, this.unit = unit;
    this.range = range, this.behavior = behavior, this.abbr = abbr;
  }

  public normalize ( value: number ) : number {
    if ( this.behavior === 'clamp' ) return this.range.clamp( value );

    if ( this.behavior === 'wrap' && this.range.min !== null && this.range.max !== null )
      return wrap( value, this.range.min, this.range.max );

    return value;
  }

  public equals ( { name, orientation, unit, range, behavior, abbr }: Axis ) : boolean {
    return this.name === name && this.orientation === orientation &&
      this.unit.name === unit.name && this.behavior === behavior && this.abbr === abbr &&
      this.unit.equals( unit ) && this.range.equals( range );
  }

  public clone () : Axis {
    return new Axis( { ...this.toJSON(), range: this.range.clone() } );
  }

  public toJSON () : AxisOptions {
    return {
      name: this.name, orientation: this.orientation, unit: this.unit,
      range: this.range, behavior: this.behavior, abbr: this.abbr
    };
  }

  public toString ( { displayUnit = true, ...options }: AxisStringOptions = {} ) : string {
    return `${ this.name }${ displayUnit ? ` [${ this.unit.toString( options ) }]` : '' }`;
  }
}
