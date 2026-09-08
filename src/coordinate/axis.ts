import { normalize, type NormalizationMode } from '../math/normalize';
import type { Unit } from '../units/unit';
import { Range, type RangeConfig } from './range';


export type AxisDirection = string;

export interface AxisConfig {
  readonly name: string;
  readonly direction: AxisDirection;
  readonly unit?: Unit;
  readonly range?: Range | RangeConfig;
  readonly normalization?: NormalizationMode;
  readonly cyclic?: boolean;
  readonly period?: number;
}


export class Axis {
  readonly name: string;
  readonly direction: AxisDirection;
  readonly unit?: Unit;
  readonly range: Range;
  readonly normalization: NormalizationMode;
  readonly cyclic: boolean;
  readonly period?: number;

  constructor ( { name, direction, unit, range = {}, normalization = 'none', cyclic = false, period }: AxisConfig ) {
    const resolvedRange = range instanceof Range ? range : new Range( range );
    const resolvedPeriod = period ?? ( cyclic ? resolvedRange.size : undefined );

    if ( cyclic && ! resolvedRange.bounded )
      throw new RangeError( 'A cyclic axis requires a finite range' );

    if ( cyclic && ( ! resolvedPeriod || resolvedPeriod <= 0 ) )
      throw new RangeError( 'A cyclic axis requires a positive period' );

    this.name = name;
    this.direction = direction;
    this.unit = unit;
    this.range = resolvedRange;
    this.normalization = normalization;
    this.cyclic = cyclic;
    this.period = resolvedPeriod;

    Object.freeze( this );
  }
}
