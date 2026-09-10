import { Value } from '../../core/Value';
import { GeocentricXAxis } from '../axis/GeocentricXAxis';


export class GeocentricX extends Value {
  public constructor ( value: number, axis: GeocentricXAxis = new GeocentricXAxis() ) {
    super( value, axis );
  }
}
