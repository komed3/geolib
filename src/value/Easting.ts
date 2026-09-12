import { EastingAxis } from '../axis/EastingAxis';
import { Value } from './Value';


export class Easting extends Value {
  public constructor ( value: number, axis: EastingAxis = new EastingAxis() ) {
    super( value, axis );
  }
}
