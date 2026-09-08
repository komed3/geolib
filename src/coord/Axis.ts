import type { TUnit } from '../lib/Units';
import { Utils } from '../lib/Utils';
import type { Range } from './Range';


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
      return Utils.wrap( value, this.range.min, this.range.max );

    return value;
  }

  public equals ( axis: Axis ) : boolean {
    return this.name === axis.name && this.direction === axis.direction &&
      this.unit.name === axis.unit.name && this.unit.symbol === axis.unit.symbol &&
      this.range.equals( axis.range ) && this.behavior === axis.behavior;
  }

  public toString ( { showUnit = true }: TAxisStringOptions = {} ) : string {
    return `${ this.name }${ showUnit ? ` [${ this.unit.symbol }]` : '' }`;
  }
}
