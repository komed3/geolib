import { Axis } from './Axis';


export interface AxisSetOptions {
  axes: ReadonlyArray< Axis >;
}


export class AxisSet {
  public readonly axes: ReadonlyArray< Axis >;

  public constructor ( { axes }: AxisSetOptions ) {
    this.axes = Object.freeze( [ ...axes ] );
  }
}
