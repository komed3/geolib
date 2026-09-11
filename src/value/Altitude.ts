import { AltitudeAxis } from '../axis/AltitudeAxis';
import { Value } from './Value';


export class Altitude extends Value {
  public constructor ( value: number, axis: AltitudeAxis = new AltitudeAxis() ) {
    super( value, axis );
  }
}
