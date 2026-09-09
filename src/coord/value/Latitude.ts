import { Value } from '../../base/Value';
import { LatitudeAxis } from '../axis/LatitudeAxis';


export class Latitude extends Value {
  public constructor ( value: number, axis: LatitudeAxis = new LatitudeAxis() ) {
    super( value, axis );
  }
}
