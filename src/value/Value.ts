import type { Axis, AxisOptions } from '../axis';


export interface ValueOptions {
  axis: Axis;
}


export class Value {
  public readonly value: number;
  public readonly axis: Axis;

  public constructor ( value: number, { axis }: ValueOptions ) {
    this.axis = axis, this.value = axis.normalize( value );
  }

  public equals ( { value, axis }: Value ) : boolean {
    return this.value === value && this.axis.equals( axis );
  }

  public clone () : Value {
    return new Value( this.value, { axis: this.axis.clone() } );
  }

  public toJSON () : { value: number, axis: AxisOptions } {
    return { value: this.value, axis: this.axis.toJSON() };
  }
}
