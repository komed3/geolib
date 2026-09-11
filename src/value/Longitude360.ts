import { Longitude360Axis } from '../axis/Longitude360Axis';
import type { DMS } from '../dms/DMS';
import { rad2deg } from '../lib/geodesy';
import { DegreeValue } from './DegreeValue';


export class Longitude360 extends DegreeValue {
  public constructor ( value: number, axis: Longitude360Axis = new Longitude360Axis() ) {
    super( value, axis );
  }

  public static fromRadians ( rad: number ) : Longitude360 {
    return new Longitude360( rad2deg( rad ) );
  }

  public static fromDMS ( dms: DMS ) : Longitude360 {
    return new Longitude360( dms.value );
  }
}
