import { Value } from '../../base/Value';
import { Geodesy } from '../../lib/Geodesy';
import { LatitudeAxis } from '../axis/LatitudeAxis';


export class Latitude extends Value {
  public constructor ( value: number, axis: LatitudeAxis = new LatitudeAxis() ) {
    super( value, axis );
  }

  public toRadians () : number {
    return Geodesy.deg2rad( this.value );
  }

  public static fromRadians ( rad: number ) : Latitude {
    return new Latitude( Geodesy.rad2deg( rad ) );
  }
}
