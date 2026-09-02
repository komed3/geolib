import { GeographicCoordinate } from '../systems/GeographicCoordinate';
import type { BoundingBox, Tile } from '../types';
import { GeodeticMath } from './GeodeticMath';


export class TileCalculator {
  public static toTile ( lat: number, lon: number, zoom: number ) : Tile {
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

    return new GeographicCoordinate(
      ( x / n ) * 360 - 180,
      GeodeticMath.radToDeg( Math.atan( Math.sinh( Math.PI * ( 1 - ( 2 * y ) / n ) ) ) )
    );
  }

  public static tileBounds ( x: number, y: number, zoom: number ) : BoundingBox {
    const northWest = this.toLatLon( x, y, zoom );
    const southEast = this.toLatLon( x + 1, y + 1, zoom );

    return {
      minLat: Math.min( northWest.lat, southEast.lat ),
      maxLat: Math.max( northWest.lat, southEast.lat ),
      minLon: Math.min( northWest.lon, southEast.lon ),
      maxLon: Math.max( northWest.lon, southEast.lon )
    };
  }

  public static tileAt ( point: GeographicCoordinate, zoom: number ) : Tile {
    return this.toTile( point.lat, point.lon, zoom );
  }
}
