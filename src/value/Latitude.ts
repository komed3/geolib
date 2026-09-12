import { LatitudeAxis } from '../axis/LatitudeAxis';
import { rad2deg } from '../utils';
import { DegreeValue } from './DegreeValue';


export class Latitude extends DegreeValue {
  public constructor ( value: number, axis: LatitudeAxis = new LatitudeAxis() ) {
    super( value, axis );
  }

  public static fromRadians ( rad: number ) : Latitude {
    return new Latitude( rad2deg( rad ) );
  }
}
