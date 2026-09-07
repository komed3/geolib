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

  public project ( { latitude, longitude }: Coordinate ) : ProjectedCoordinate {
    const lat = deg2Rad( latitude.value ), lon = deg2Rad( longitude.value );
    const centralMeridian = deg2Rad( this.centralMeridian );
    const latitudeOfOrigin = deg2Rad( this.latitudeOfOrigin );

    if ( Math.abs( lat ) >= Math.PI / 2 )
      throw new RangeError( 'Transverse Mercator projection is undefined at the poles' );

    const a = this.ellipsoid.semiMajorAxis;
    const e2 = this.ellipsoid.firstEccentricitySquared;
    const ePrime2 = this.ellipsoid.secondEccentricitySquared;

    const sinLatitude = Math.sin( lat );
    const cosLatitude = Math.cos( lat );
    const tanLatitude = Math.tan( lat );

    const n = a / Math.sqrt( 1 - e2 * sinLatitude ** 2 );
    const t = tanLatitude ** 2;
    const c = ePrime2 * cosLatitude ** 2;
    const a1 = cosLatitude * ( lon - centralMeridian );

    const m = this.meridionalArc( lat, a, e2 ) - this.meridionalArc( latitudeOfOrigin, a, e2 );

    const x = this.falseEasting + this.scaleFactor * n * ( a1 + ( 1 - t + c ) * a1 ** 3 / 6 +
      ( 5 - 18 * t + t ** 2 + 72 * c - 58 * ePrime2 ) * a1 ** 5 / 120
    );

    const y = this.falseNorthing + this.scaleFactor * ( m + n * tanLatitude * ( a1 ** 2 / 2 +
      ( 5 - t + 9 * c + 4 * c ** 2 ) * a1 ** 4 / 24 +
      ( 61 - 58 * t + t ** 2 + 600 * c - 330 * ePrime2 ) * a1 ** 6 / 720
    ) );

    return new ProjectedCoordinate( x, y );
  }

  public unproject ( { easting, northing }: ProjectedCoordinate ) : Coordinate {
    const x = ( easting - this.falseEasting ) / this.scaleFactor;
    const y = ( northing - this.falseNorthing ) / this.scaleFactor;

    const a = this.ellipsoid.semiMajorAxis;
    const e2 = this.ellipsoid.firstEccentricitySquared;
    const ePrime2 = this.ellipsoid.secondEccentricitySquared;

    const latitudeOfOrigin = deg2Rad( this.latitudeOfOrigin );
    const centralMeridian = deg2Rad( this.centralMeridian );

    const m0 = this.meridionalArc( latitudeOfOrigin, a, e2 );
    const mu = ( m0 + y ) / a;

    const e1 = ( 1 - Math.sqrt( 1 - e2 ) ) / ( 1 + Math.sqrt( 1 - e2 ) );

    const phi1 = mu + ( 3 * e1 / 2 - 27 * e1 ** 3 / 32 ) * Math.sin( 2 * mu ) +
      ( 21 * e1 ** 2 / 16 - 55 * e1 ** 4 / 32 ) * Math.sin( 4 * mu ) +
      ( 151 * e1 ** 3 / 96 ) * Math.sin( 6 * mu ) + ( 1097 * e1 ** 4 / 512 ) * Math.sin( 8 * mu );

    const sinPhi1 = Math.sin( phi1 );
    const cosPhi1 = Math.cos( phi1 );
    const tanPhi1 = Math.tan( phi1 );

    const c1 = ePrime2 * cosPhi1 ** 2;
    const t1 = tanPhi1 ** 2;
    const n1 = a / Math.sqrt( 1 - e2 * sinPhi1 ** 2 );
    const r1 = a * ( 1 - e2 ) / ( 1 - e2 * sinPhi1 ** 2 ) ** 1.5;
    const d = x / n1;

    const latitude = phi1 - ( n1 * tanPhi1 / r1 ) * ( d ** 2 / 2 -
      ( 5 + 3 * t1 + 10 * c1 - 4 * c1 ** 2 - 9 * ePrime2 ) * d ** 4 / 24 +
      ( 61 + 90 * t1 + 298 * c1 + 45 * t1 ** 2 - 252 * ePrime2 - 3 * c1 ** 2 ) * d ** 6 / 720
    );

    const longitude = centralMeridian + ( d - ( 1 + 2 * t1 + c1 ) * d ** 3 / 6 +
      ( 5 - 2 * c1 + 28 * t1 - 3 * c1 ** 2 + 8 * ePrime2 + 24 * t1 ** 2 ) * d ** 5 / 120
    ) / cosPhi1;

    return Coordinate.fromRadians( latitude, longitude );
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
