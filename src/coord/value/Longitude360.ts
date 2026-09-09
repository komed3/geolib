import { Value } from '../../base/Value';
import { Longitude360Axis } from '../axis/Longitude360Axis';


export class Longitude360 extends Value {
  public constructor ( value: number, axis: Longitude360Axis = new Longitude360Axis() ) {
    super( value, axis );
  }
}
