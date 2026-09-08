import { Axis } from './Axis';


export class AxisSet {
  public readonly axes: readonly Axis[];

  public constructor ( axes: readonly Axis[] ) {
    this.axes = Object.freeze( [ ...axes ] );
  }
}
