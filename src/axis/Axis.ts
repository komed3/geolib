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
}
