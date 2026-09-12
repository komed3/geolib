import { Axis } from '../axis';


export interface ValueOptions {
  axis: Axis;
}


export class Value {
  public readonly value: number;
  public readonly axis: Axis;

  public constructor ( value: number, { axis }: ValueOptions ) {
    this.axis = axis, this.value = axis.normalize( value );
  }
}
