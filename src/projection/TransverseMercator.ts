import { Coordinate } from '../coordinate/Coordinate';
import type { Ellipsoid } from '../crs/Ellipsoid';
import { deg2Rad } from '../utils/math';
import { ProjectedCoordinate } from './ProjectedCoordinate';
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

  private meridionalArc ( latitude: number, semiMajorAxis: number, eccentricitySquared: number ) : number {
    const e4 = eccentricitySquared ** 2, e6 = eccentricitySquared ** 3;

    return semiMajorAxis * (
      ( 1 - eccentricitySquared / 4 - 3 * e4 / 64 - 5 * e6 / 256 ) * latitude -
      ( 3 * eccentricitySquared / 8 + 3 * e4 / 32 + 45 * e6 / 1024 ) * Math.sin( 2 * latitude ) +
      ( 15 * e4 / 256 + 45 * e6 / 1024 ) * Math.sin( 4 * latitude ) -
      ( 35 * e6 / 3072 ) * Math.sin( 6 * latitude )
    );
  }

  public project ( coordinate: Coordinate ) : ProjectedCoordinate {
    const latitude = deg2Rad( coordinate.latitude.value );
    const longitude = deg2Rad( coordinate.longitude.value );
    const centralMeridian = deg2Rad( this.centralMeridian );
    const latitudeOfOrigin = deg2Rad( this.latitudeOfOrigin );

    const a = this.ellipsoid.semiMajorAxis;
    const e2 = this.ellipsoid.firstEccentricitySquared;
    const ePrime2 = this.ellipsoid.secondEccentricitySquared;

    const sinLatitude = Math.sin( latitude );
    const cosLatitude = Math.cos( latitude );
    const tanLatitude = Math.tan( latitude );

    const n = a / Math.sqrt( 1 - e2 * sinLatitude ** 2 );
    const t = tanLatitude ** 2;
    const c = ePrime2 * cosLatitude ** 2;
    const a1 = cosLatitude * ( longitude - centralMeridian );

    const m = this.meridionalArc( latitude, a, e2 ) - this.meridionalArc( latitudeOfOrigin, a, e2 );

    const x = this.falseEasting + this.scaleFactor * n * ( a1 + ( 1 - t + c ) * a1 ** 3 / 6 +
      ( 5 - 18 * t + t ** 2 + 72 * c - 58 * ePrime2 ) * a1 ** 5 / 120
    );

    const y = this.falseNorthing + this.scaleFactor * ( m + n * tanLatitude * ( a1 ** 2 / 2 +
        ( 5 - t + 9 * c + 4 * c ** 2 ) * a1 ** 4 / 24 +
        ( 61 - 58 * t + t ** 2 + 600 * c - 330 * ePrime2 ) * a1 ** 6 / 720
      )
    );

    return new ProjectedCoordinate( x, y );
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
