import { Axis } from '../axis';


export class Value {
  public readonly value: number;
  public readonly axis: Axis;

  public constructor ( value: number, axis: Axis ) {
    this.axis = axis, this.value = axis.normalize( value );
  }
}
