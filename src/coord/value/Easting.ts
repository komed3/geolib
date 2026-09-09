import type { Axis } from '../../base/Axis';
import { Value } from '../../base/Value';
import { EastingAxis } from '../axis/EastingAxis';


export class Easting extends Value {
  public constructor ( value: number, axis: Axis = new EastingAxis() ) {
    super( value, axis );
  }
}
