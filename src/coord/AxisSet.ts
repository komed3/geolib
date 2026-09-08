import { Axis } from './Axis';


export interface TAxisSetStringOptions {
  showUnit?: boolean;
  delimiter?: string;
}


export class AxisSet {
  public readonly axes: readonly Axis[];

  public constructor ( axes: readonly Axis[] ) {
    this.axes = Object.freeze( [ ...axes ] );
  }
}
