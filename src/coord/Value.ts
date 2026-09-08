import { Axis } from './Axis';


export interface TValueStringOptions {
  locale?: string;
  precision?: number;
  showUnit?: boolean;
}


export class Value {
  public readonly value: number;
  public readonly axis: Axis;

  public constructor ( value: number, axis: Axis ) {
    this.axis = axis, this.value = axis.initialize( value );
  }
}
