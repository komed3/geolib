import type { Ellipsoid } from '../crs/Ellipsoid';
import { Projection } from './Projection';


export class TransverseMercator extends Projection {
  public constructor (
    public readonly ellipsoid: Ellipsoid,
    public readonly centralMeridian: number,
    public readonly latitudeOfOrigin: number = 0,
    public readonly scaleFactor: number = 1,
    public readonly falseEasting: number = 0,
    public readonly falseNorthing: number = 0
  ) {
    super( 'Transverse Mercator' );

    if ( ! Number.isFinite( centralMeridian ) || centralMeridian < -180 || centralMeridian > 180 )
      throw new RangeError( 'Central meridian must be between -180 and 180 degrees' );

    if ( ! Number.isFinite( latitudeOfOrigin ) || latitudeOfOrigin < -90 || latitudeOfOrigin > 90 )
      throw new RangeError( 'Latitude of origin must be between -90 and 90 degrees' );

    if ( ! Number.isFinite( scaleFactor ) || scaleFactor <= 0 )
      throw new RangeError( 'Scale factor must be a positive finite number' );

    if ( ! Number.isFinite( falseEasting ) )
      throw new TypeError( 'False easting must be a finite number' );

    if ( ! Number.isFinite( falseNorthing ) )
      throw new TypeError( 'False northing must be a finite number' );
  }

  public clone () : TransverseMercator {
    return new TransverseMercator(
      this.ellipsoid.clone(), this.centralMeridian, this.latitudeOfOrigin,
      this.scaleFactor, this.falseEasting, this.falseNorthing
    );
  }

  public equals ( other: Projection ) : boolean {
    return other instanceof TransverseMercator && this.ellipsoid.equals( other.ellipsoid ) &&
      this.centralMeridian === other.centralMeridian && this.latitudeOfOrigin === other.latitudeOfOrigin &&
      this.scaleFactor === other.scaleFactor && this.falseEasting === other.falseEasting &&
      this.falseNorthing === other.falseNorthing;
  }
}
