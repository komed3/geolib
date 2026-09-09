import type { Axis } from '../../base/Axis';
import { Value } from '../../base/Value';
import { GeocentricXAxis } from '../axis/GeocentricXAxis';


export class GeocentricX extends Value {
  public constructor ( value: number, axis: Axis = new GeocentricXAxis() ) {
    super( value, axis );
  }
}
