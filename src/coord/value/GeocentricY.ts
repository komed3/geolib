import { Value } from '../../base/Value';
import { GeocentricYAxis } from '../axis/GeocentricYAxis';


export class GeocentricY extends Value {
  public constructor ( value: number, axis: GeocentricYAxis = new GeocentricYAxis() ) {
    super( value, axis );
  }
}
