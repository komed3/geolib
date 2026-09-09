import type { Axis } from '../../base/Axis';
import { Value } from '../../base/Value';
import { GeocentricZAxis } from '../axis/GeocentricZAxis';


export class GeocentricZ extends Value {
  public constructor ( value: number, axis: Axis = new GeocentricZAxis() ) {
    super( value, axis );
  }
}
