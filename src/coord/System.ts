import type { Axis } from './Axis';
import { AxisSet } from './AxisSet';


export interface ISystem {
  readonly name?: string;
  readonly type?: string;
  readonly axes: AxisSet | readonly Axis[];
}


export class System {
  public readonly name?: string;
  public readonly type?: string;
  public readonly axes: AxisSet;

  public constructor ( { name, type, axes }: ISystem ) {
    this.name = name, this.type = type;
    this.axes = axes instanceof AxisSet ? axes : new AxisSet( axes );
  }
}
