import { GeocentricYAxis } from '../axis/GeocentricYAxis';
import { Value } from './Value';


export class GeocentricY extends Value {
  public constructor ( value: number, axis: GeocentricYAxis = new GeocentricYAxis() ) {
    super( value, axis );
  }
}
