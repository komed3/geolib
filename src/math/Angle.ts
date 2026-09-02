import type { GeographicCoordinate } from '../systems/GeographicCoordinate.js';
import { GeodeticMath } from './GeodeticMath.js';


export class Angle {
  public static toRadians ( deg: number ) : number {
    return GeodeticMath.degToRad( deg );
  }

  public static toDegrees ( rad: number ) : number {
    return GeodeticMath.radToDeg( rad );
  }

  public static bearing ( from: GeographicCoordinate, to: GeographicCoordinate ) : number {
    const lat1 = GeodeticMath.degToRad( from.lat );
    const lat2 = GeodeticMath.degToRad( to.lat );
    const dLon = GeodeticMath.degToRad( to.lon - from.lon );

    return ( GeodeticMath.radToDeg(
      Math.atan2( Math.sin( dLon ) * Math.cos( lat2 ),
      Math.cos( lat1 ) * Math.sin( lat2 ) - Math.sin( lat1 ) * Math.cos( lat2 ) * Math.cos( dLon ) )
    ) + 360 ) % 360;
  }
}
