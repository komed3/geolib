import { DegreeValue } from '../../base/DegreeValue';
import type { DMS } from '../../base/DMS';
import { Geodesy } from '../../lib/Geodesy';
import { LongitudeAxis } from '../axis/LongitudeAxis';


export class Longitude extends DegreeValue {
  public constructor ( value: number, axis: LongitudeAxis = new LongitudeAxis() ) {
    super( value, axis );
  }

  public static fromRadians ( rad: number ) : Longitude {
    return new Longitude( Geodesy.rad2deg( rad ) );
  }

  public static fromDMS ( dms: DMS ) : Longitude {
    return new Longitude( dms.toDecimals() );
  }
}
