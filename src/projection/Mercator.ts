import type { Ellipsoid } from '../crs/Ellipsoid';
import { Projection } from './Projection';


export class Mercator extends Projection {
  public constructor (
    public readonly ellipsoid: Ellipsoid,
    public readonly centralMeridian: number = 0,
    public readonly scaleFactor: number = 1,
    public readonly falseEasting: number = 0,
    public readonly falseNorthing: number = 0
  ) {
    super( 'Mercator' );

    if ( ! Number.isFinite( centralMeridian ) || centralMeridian < -180 || centralMeridian > 180 )
      throw new RangeError( 'Central meridian must be between -180 and 180 degrees' );

    if ( ! Number.isFinite( scaleFactor ) || scaleFactor <= 0 )
      throw new RangeError( 'Scale factor must be a positive finite number' );

    if ( ! Number.isFinite( falseEasting ) )
      throw new TypeError( 'False easting must be a finite number' );

    if ( ! Number.isFinite( falseNorthing ) )
      throw new TypeError( 'False northing must be a finite number' );
  }
}
