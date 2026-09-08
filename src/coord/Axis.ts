import type { IUnit } from '../lib/Units';
import { Utils } from '../lib/Utils';
import { Range } from './Range';


export type TAxisNormalization = 'none' | 'clamp' | 'wrap';

export interface IAxis {
  readonly name: string;
  readonly direction: string;
  readonly unit: IUnit;
  readonly range?: Range;
  readonly normalization?: TAxisNormalization;
  readonly cyclic?: boolean;
  readonly period?: number;
}


export class Axis {
  public readonly name: string;
  public readonly direction: string;
  public readonly unit: IUnit;
  public readonly range: Range;
  public readonly normalization: TAxisNormalization;
  public readonly cyclic: boolean;
  public readonly period?: number;

  public constructor ( { name, direction, unit, range, normalization = 'none', cyclic = false, period }: IAxis ) {
    this.name = name, this.direction = direction, this.unit = unit;
    this.range = range instanceof Range ? range : new Range( range );

    this.normalization = normalization;
    this.cyclic = cyclic;
    this.period = period;
  }

  public contains ( value: number ) : boolean {
    return this.range.contains( value );
  }

  public clamp ( value: number ) : number {
    return this.range.clamp( value );
  }

  public normalize ( value: number ) : number {
    return this.normalization === 'wrap' && this.cyclic
      ? Utils.wrap( value, this.range.min, this.period ?? this.range.max )
      : Utils.normalize( value, this.range.min, this.range.max, this.normalization );
  }

  public equals ( axis: Axis ) : boolean {
    return this.name === axis.name && this.direction === axis.direction &&
      this.unit === axis.unit && this.range.equals( axis.range ) &&
      this.normalization === axis.normalization && this.cyclic === axis.cyclic &&
      this.period === axis.period;
  }
}
