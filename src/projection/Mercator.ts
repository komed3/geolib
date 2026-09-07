import { Coordinate } from '../coordinate/Coordinate';
import type { Ellipsoid } from '../crs/Ellipsoid';
import { deg2Rad } from '../utils/math';
import { ProjectedCoordinate } from './ProjectedCoordinate';
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

  public project ( { latitude, longitude }: Coordinate ) : ProjectedCoordinate {
    const lat = deg2Rad( latitude.value ), lon = deg2Rad( longitude.value );
    const centralMeridian = deg2Rad( this.centralMeridian );

    if ( Math.abs( lat ) >= Math.PI / 2 )
      throw new RangeError( 'Mercator projection is undefined at the poles' );

    const eccentricity = this.ellipsoid.firstEccentricity;
    const sinLatitude = Math.sin( lat );

    const x = this.ellipsoid.semiMajorAxis * this.scaleFactor *
      ( lon - centralMeridian ) + this.falseEasting;

    const y = this.ellipsoid.semiMajorAxis * this.scaleFactor * Math.log(
      Math.tan( Math.PI / 4 + lat / 2 ) * ( ( 1 - eccentricity * sinLatitude ) /
        ( 1 + eccentricity * sinLatitude ) ) ** ( eccentricity / 2 )
    ) + this.falseNorthing;

    return new ProjectedCoordinate( x, y );
  }

  public unproject ( { easting, northing }: ProjectedCoordinate ) : Coordinate {
    const a = this.ellipsoid.semiMajorAxis;
    const e2 = this.ellipsoid.firstEccentricitySquared;
    const e4 = e2 ** 2, e6 = e2 ** 3, e8 = e2 ** 4;

    const chi = Math.PI / 2 - 2 * Math.atan(
      Math.exp( ( this.falseNorthing - northing ) / ( a * this.scaleFactor ) )
    );

    const latitude = chi +
      ( e2 / 2 + 5 * e4 / 24 + e6 / 12 + 13 * e8 / 360 ) * Math.sin( 2 * chi ) +
      ( 7 * e4 / 48 + 29 * e6 / 240 + 811 * e8 / 11520 ) * Math.sin( 4 * chi ) +
      ( 7 * e6 / 120 + 81 * e8 / 1120 ) * Math.sin( 6 * chi ) +
      ( 4279 * e8 / 161280 ) * Math.sin( 8 * chi );

    const longitude = deg2Rad( this.centralMeridian ) +
      ( easting - this.falseEasting ) / ( a * this.scaleFactor );

    return Coordinate.fromRadians( latitude, longitude );
  }

  public clone () : Mercator {
    return new Mercator(
      this.ellipsoid.clone(), this.centralMeridian, this.scaleFactor,
      this.falseEasting, this.falseNorthing
    );
  }

  public equals ( other: Projection ) : boolean {
    return other instanceof Mercator && this.ellipsoid.equals( other.ellipsoid ) &&
      this.centralMeridian === other.centralMeridian && this.scaleFactor === other.scaleFactor &&
      this.falseEasting === other.falseEasting && this.falseNorthing === other.falseNorthing;
  }
}
