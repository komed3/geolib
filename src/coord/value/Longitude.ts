import { Value } from '../../base/Value';
import { Geodesy } from '../../lib/Geodesy';
import { LongitudeAxis } from '../axis/LongitudeAxis';


export class Longitude extends Value {
  public constructor ( value: number, axis: LongitudeAxis = new LongitudeAxis() ) {
    super( value, axis );
  }

  public toRadians () : number {
    return Geodesy.deg2rad( this.value );
  }

  public static fromRadians ( rad: number ) : Longitude {
    return new Longitude( Geodesy.rad2deg( rad ) );
  }
}
