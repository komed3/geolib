import { DegreeValue } from '../../base/DegreeValue';
import { Geodesy } from '../../lib/Geodesy';
import { Longitude360Axis } from '../axis/Longitude360Axis';


export class Longitude360 extends DegreeValue {
  public constructor ( value: number, axis: Longitude360Axis = new Longitude360Axis() ) {
    super( value, axis );
  }

  public static fromRadians ( rad: number ) : Longitude360 {
    return new Longitude360( Geodesy.rad2deg( rad ) );
  }
}
