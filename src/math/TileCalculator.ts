import { GeodeticMath } from './GeodeticMath';


export interface TileXY {
  x: number;
  y: number;
  z: number;
}


export class TileCalculator {
  public static toTile ( lat: number, lng: number, zoom: number ) : TileXY {
    const latitude = Math.min( Math.max( lat, -85.05112878 ), 85.05112878 );
    const sinLat = Math.sin( GeodeticMath.degToRad( latitude ) );

    return {
      x: Math.floor( ( ( lng + 180 ) / 360 ) * 2 ** zoom ),
      y: Math.floor( ( 0.5 - Math.log( ( 1 + sinLat ) / ( 1 - sinLat ) ) / ( 4 * Math.PI ) ) * 2 ** zoom ),
      z: zoom
    };
  }
}
