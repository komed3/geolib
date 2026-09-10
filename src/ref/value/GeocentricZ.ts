import { Value } from '../../core/Value';
import { GeocentricZAxis } from '../axis/GeocentricZAxis';


export class GeocentricZ extends Value {
  public constructor ( value: number, axis: GeocentricZAxis = new GeocentricZAxis() ) {
    super( value, axis );
  }
}
