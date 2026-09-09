import type { Axis } from '../../base/Axis';
import { Value } from '../../base/Value';
import { AltitudeAxis } from '../axis/AltitudeAxis';


export class Altitude extends Value {
  public constructor ( value: number, axis: Axis = new AltitudeAxis() ) {
    super( value, axis );
  }
}
