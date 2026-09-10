import { DegreeValue } from '../../core/DegreeValue';
import type { DMS } from '../../core/DMS';
import { rad2deg } from '../../lib/geodesy';
import { LongitudeAxis } from '../axis/LongitudeAxis';


export class Longitude extends DegreeValue {
  public constructor ( value: number, axis: LongitudeAxis = new LongitudeAxis() ) {
    super( value, axis );
  }

  public static fromRadians ( rad: number ) : Longitude {
    return new Longitude( rad2deg( rad ) );
  }

  public static fromDMS ( dms: DMS ) : Longitude {
    return new Longitude( dms.value );
  }
}
