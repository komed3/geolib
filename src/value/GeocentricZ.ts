import { GeocentricZAxis } from '../axis/GeocentricZAxis';
import { Value } from './Value';


export class GeocentricZ extends Value {
  public constructor ( value: number, axis: GeocentricZAxis = new GeocentricZAxis() ) {
    super( value, axis );
  }
}
