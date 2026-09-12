import { LongitudeAxis } from '../axis/LongitudeAxis';
import { rad2deg } from '../utils';
import { DegreeValue } from './DegreeValue';


export class Longitude extends DegreeValue {
  public constructor ( value: number, axis: LongitudeAxis = new LongitudeAxis() ) {
    super( value, axis );
  }

  public static fromRadians ( rad: number ) : Longitude {
    return new Longitude( rad2deg( rad ) );
  }
}
