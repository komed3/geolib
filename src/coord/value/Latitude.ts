import type { Axis } from '../../base/Axis';
import { Value } from '../../base/Value';
import { LatitudeAxis } from '../axis/LatitudeAxis';


export class Latitude extends Value {
  public constructor ( value: number, axis: Axis = new LatitudeAxis() ) {
    super( value, axis );
  }
}
