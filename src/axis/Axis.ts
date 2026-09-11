import type { Range } from '../range';
import type { Unit } from '../unit';
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

export interface AxisStringOptions {
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
}
