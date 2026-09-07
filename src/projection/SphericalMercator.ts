import { Coordinate } from '../coordinate/Coordinate';
import { deg2Rad } from '../utils/math';
import { ProjectedCoordinate } from './ProjectedCoordinate';
import { Projection } from './Projection';


export class SphericalMercator extends Projection {
  public constructor (
    public readonly radius: number = 6378137,
    public readonly centralMeridian: number = 0,
    public readonly scaleFactor: number = 1,
    public readonly falseEasting: number = 0,
    public readonly falseNorthing: number = 0
  ) {
    super( 'Spherical Mercator' );

    if ( ! Number.isFinite( radius ) || radius <= 0 )
      throw new RangeError( 'Radius must be a positive finite number' );

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

    const maxLatitude = deg2Rad( 85.0511287798066 );
    const clampedLatitude = Math.max( -maxLatitude, Math.min( maxLatitude, latitude ) );

    const x = this.radius * this.scaleFactor * ( longitude - centralMeridian ) + this.falseEasting;
    const y = this.radius * this.scaleFactor * Math.log(
      Math.tan( Math.PI / 4 + clampedLatitude / 2 )
    ) + this.falseNorthing;

    return new ProjectedCoordinate( x, y );
  }

  public unproject ( coordinate: ProjectedCoordinate ) : Coordinate {
    const x = ( coordinate.easting - this.falseEasting ) / ( this.radius * this.scaleFactor );
    const y = ( coordinate.northing - this.falseNorthing ) / ( this.radius * this.scaleFactor );

    const longitude = deg2Rad( this.centralMeridian ) + x;
    const latitude = 2 * Math.atan( Math.exp( y ) ) - Math.PI / 2;

    return Coordinate.fromRadians( latitude, longitude );
  }

  public clone () : SphericalMercator {
    return new SphericalMercator(
      this.radius, this.centralMeridian, this.scaleFactor,
      this.falseEasting, this.falseNorthing
    );
  }

  public equals ( other: Projection ) : boolean {
    return other instanceof SphericalMercator && this.radius === other.radius &&
      this.centralMeridian === other.centralMeridian && this.scaleFactor === other.scaleFactor &&
      this.falseEasting === other.falseEasting && this.falseNorthing === other.falseNorthing;
  }
}
