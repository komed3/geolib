import type { GeographicCoordinate } from '../systems/GeographicCoordinate.js';
import { GeodeticMath } from './GeodeticMath.js';


export class Angle {
  public static toRadians ( deg: number ) : number {
    return GeodeticMath.degToRad( deg );
  }

  public static toDegrees ( rad: number ) : number {
    return GeodeticMath.radToDeg( rad );
  }

  public static bearing ( from: GeographicCoordinate, to: GeographicCoordinate ) : number {}
}
