import { GeodeticMath } from './GeodeticMath.js';


export class ZoomCalculator {
  public static metersPerPixel ( meters: number, lat: number ) : number {
    if ( ! ( meters > 0 ) ) throw new RangeError( 'meters must be positive' );

    return Math.max( 0, Math.round( Math.log2(
      ( 156543.03392 * Math.cos( GeodeticMath.degToRad( lat ) )
    ) / meters ) ) );
  }

  public static scale ( scale: number, lat: number ) : number {
    if ( ! ( scale > 0 ) ) throw new RangeError( 'scale must be positive' );
    return this.metersPerPixel( ( scale * 0.00028 ) / 256, lat );
  }
}
