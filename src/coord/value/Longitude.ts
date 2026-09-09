import type { Axis } from '../../base/Axis';
import { Value } from '../../base/Value';
import { LongitudeAxis } from '../axis/LongitudeAxis';


export class Longitude extends Value {
  public constructor ( value: number, axis: Axis = new LongitudeAxis() ) {
    super( value, axis );
  }
}
