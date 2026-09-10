import { Value } from '../../core/Value';
import { AltitudeAxis } from '../axis/AltitudeAxis';


export class Altitude extends Value {
  public constructor ( value: number, axis: AltitudeAxis = new AltitudeAxis() ) {
    super( value, axis );
  }
}
