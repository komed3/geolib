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
