import { Geodesy } from '../lib/Geodesy';
import type { Axis } from './Axis';
import { Value } from './Value';


export class DegreeValue extends Value {
  public constructor ( value: number, axis: Axis ) {
    super( value, axis );
  }

  public toRadians () : number {
    return Geodesy.deg2rad( this.value );
  }
}
