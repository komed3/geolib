import { DegreeValue } from '../../base/DegreeValue';
import type { DMS } from '../../base/DMS';
import { Geodesy } from '../../lib/Geodesy';
import { LatitudeAxis } from '../axis/LatitudeAxis';


export class Latitude extends DegreeValue {
  public constructor ( value: number, axis: LatitudeAxis = new LatitudeAxis() ) {
    super( value, axis );
  }

  public static fromRadians ( rad: number ) : Latitude {
    return new Latitude( Geodesy.rad2deg( rad ) );
  }

  public static fromDMS ( dms: DMS ) : Latitude {
    return new Latitude( dms.value );
  }
}
