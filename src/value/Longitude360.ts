import { Longitude360Axis } from '../axis/Longitude360Axis';
import { rad2deg } from '../utils';
import { DegreeValue } from './DegreeValue';


export class Longitude360 extends DegreeValue {
  public constructor ( value: number, axis: Longitude360Axis = new Longitude360Axis() ) {
    super( value, axis );
  }

  public static fromRadians ( rad: number ) : Longitude360 {
    return new Longitude360( rad2deg( rad ) );
  }
}
