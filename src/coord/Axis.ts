import type { IUnit } from '../lib/Units';
import { Utils } from '../lib/Utils';
import type { Range } from './Range';


export type TAxisNormalization = 'none' | 'clamp' | 'wrap';

export interface IAxis {
  readonly name: string;
  readonly direction: string;
  readonly unit: IUnit;
  readonly range: Range;
  readonly normalization?: TAxisNormalization;
  readonly cyclic?: boolean;
  readonly period?: number;
}
