import { Range } from '../range';
import { Unit } from '../unit';


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


export class Axis {}
