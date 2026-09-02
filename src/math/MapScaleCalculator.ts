import { GeodeticMath } from './GeodeticMath.js';


export class MapScaleCalculator {
  public static metersPerPixel ( lat: number, zoom: number ) : number {
    return ( 156543.03392 / 2 ** zoom ) * Math.cos( GeodeticMath.degToRad( lat ) );
  }

  public static scaleForZoom ( zoom: number, lat: number, pixelWidth = 256 ) : number {
    return ( this.metersPerPixel( lat, zoom ) * pixelWidth ) / 0.00028;
  }
}
