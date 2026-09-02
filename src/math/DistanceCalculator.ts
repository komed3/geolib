import type { GeographicCoordinate } from '../systems/GeographicCoordinate';
import { GeodeticMath } from './GeodeticMath';


export class DistanceCalculator {
  public static haversine ( from: GeographicCoordinate, to: GeographicCoordinate ) : number {
    const lat1 = GeodeticMath.degToRad( from.lat );
    const lat2 = GeodeticMath.degToRad( to.lat );
    const dLat = GeodeticMath.degToRad( to.lat - from.lat );
    const dLon = GeodeticMath.degToRad( to.lon - from.lon );

    const a = Math.sin( dLat / 2 ) ** 2 + Math.cos( lat1 ) * Math.cos( lat2 ) * Math.sin( dLon / 2 ) ** 2;
    const c = 2 * Math.atan2( Math.sqrt( a ), Math.sqrt( 1 - a ) );

    return GeodeticMath.EARTH_RADIUS_METERS * c;
  }
}
