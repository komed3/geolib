import { Utils } from '../lib/Utils';
import type { TUnit } from '../lib/Units';
import { Range } from './Range';


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
