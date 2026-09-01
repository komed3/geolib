import { GeographicCoordinate } from '../system/GeographicCoordinate';
import { GeodeticMath } from './GeodeticMath';


export interface TileXY {
  x: number;
  y: number;
  z: number;
}


export class TileCalculator {
  public static toTile ( lat: number, lon: number, zoom: number ) : TileXY {
    const latitude = Math.min( Math.max( lat, -85.05112878 ), 85.05112878 );
    const sinLat = Math.sin( GeodeticMath.degToRad( latitude ) );

    return {
      x: Math.floor( ( ( lon + 180 ) / 360 ) * 2 ** zoom ),
      y: Math.floor( ( 0.5 - Math.log( ( 1 + sinLat ) / ( 1 - sinLat ) ) / ( 4 * Math.PI ) ) * 2 ** zoom ),
      z: zoom
    };
  }

  public static toLatLon ( x: number, y: number, zoom: number ) : GeographicCoordinate {
    const n = 2 ** zoom;

    const lon = ( x / n ) * 360 - 180;
    const lat = GeodeticMath.radToDeg( Math.atan( Math.sinh( Math.PI * ( 1 - ( 2 * y ) / n ) ) ) );

    return new GeographicCoordinate( lat, lon );
  }
}
