import { GeocentricXAxis } from '../axis/GeocentricXAxis';
import { Value } from './Value';


export class GeocentricX extends Value {
  public constructor ( value: number, axis: GeocentricXAxis = new GeocentricXAxis() ) {
    super( value, axis );
  }
}
