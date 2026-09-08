import type { Axis } from './Axis';
import type { AxisSet } from './AxisSet';


export interface ICoordinateSystem {
  readonly name?: string;
  readonly type?: string;
  readonly axes: AxisSet | readonly Axis[];
}
