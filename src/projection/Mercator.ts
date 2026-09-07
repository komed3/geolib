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

  public project ( coordinate: Coordinate ) : ProjectedCoordinate {
    const latitude = deg2Rad( coordinate.latitude.value );
    const longitude = deg2Rad( coordinate.longitude.value );
    const centralMeridian = deg2Rad( this.centralMeridian );
    const eccentricity = this.ellipsoid.firstEccentricity;
    const sinLatitude = Math.sin( latitude );

    const x = this.ellipsoid.semiMajorAxis * this.scaleFactor *
      ( longitude - centralMeridian ) + this.falseEasting;

    const y = this.ellipsoid.semiMajorAxis * this.scaleFactor * Math.log(
      Math.tan( Math.PI / 4 + latitude / 2 ) * (
        ( 1 - eccentricity * sinLatitude ) / ( 1 + eccentricity * sinLatitude )
      ) ** ( eccentricity / 2 )
    ) + this.falseNorthing;

    return new ProjectedCoordinate( x, y );
  }

  public unproject ( { easting, northing }: ProjectedCoordinate ) : Coordinate {
    const eccentricity = this.ellipsoid.firstEccentricity;
    const x = ( easting - this.falseEasting ) / ( this.ellipsoid.semiMajorAxis * this.scaleFactor );
    const y = ( northing - this.falseNorthing ) / ( this.ellipsoid.semiMajorAxis * this.scaleFactor );

    const longitude = deg2Rad( this.centralMeridian ) + x;
    let latitude = Math.PI / 2 - 2 * Math.atan( Math.exp( -y ) );

    for ( let i = 0; i < 10; i++ ) {
      const sinLatitude = Math.sin( latitude );

      const next = Math.PI / 2 - 2 * Math.atan( Math.exp( -y ) * (
        ( 1 - eccentricity * sinLatitude ) / ( 1 + eccentricity * sinLatitude )
      ) ** ( eccentricity / 2 ) );

      if ( Math.abs( next - latitude ) < 1e-12 ) { latitude = next; break }
      latitude = next;
    }

    return Coordinate.fromRadians( latitude, longitude );
  }
}
