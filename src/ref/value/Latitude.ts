import { DegreeValue } from '../../core/DegreeValue';
import type { DMS } from '../../core/DMS';
import { rad2deg } from '../../lib/geodesy';
import { LatitudeAxis } from '../axis/LatitudeAxis';


export class Latitude extends DegreeValue {
  public constructor ( value: number, axis: LatitudeAxis = new LatitudeAxis() ) {
    super( value, axis );
  }

  public static fromRadians ( rad: number ) : Latitude {
    return new Latitude( rad2deg( rad ) );
  }

  public static fromDMS ( dms: DMS ) : Latitude {
    return new Latitude( dms.value );
  }
}
