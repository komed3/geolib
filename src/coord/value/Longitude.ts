import { Value } from '../../base/Value';
import { LongitudeAxis } from '../axis/LongitudeAxis';


export class Longitude extends Value {
  public constructor ( value: number, axis: LongitudeAxis = new LongitudeAxis() ) {
    super( value, axis );
  }
}
