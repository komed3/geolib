import { Coordinate } from '../coordinate/Coordinate';
import { ProjectedCoordinate } from '../projection/ProjectedCoordinate';
import { GeometryCoordinate, Point } from './Point';


export class BoundingBox< T extends GeometryCoordinate = GeometryCoordinate > {
  public constructor ( public readonly min: T, public readonly max: T ) {
    if ( min instanceof Coordinate && max instanceof Coordinate ) {
      if ( min.latitude.value > max.latitude.value || min.longitude.value > max.longitude.value )
        throw new RangeError( 'Minimum coordinate must not exceed maximum coordinate' );

      return;
    }

    if ( min instanceof ProjectedCoordinate && max instanceof ProjectedCoordinate ) {
      if ( min.easting > max.easting || min.northing > max.northing )
        throw new RangeError( 'Minimum coordinate must not exceed maximum coordinate' );

      return;
    }

    throw new TypeError( 'Coordinates must use the same coordinate type' );
  }

  public clone () : BoundingBox< T > {
    return new BoundingBox( this.min.clone() as T, this.max.clone() as T );
  }

  public equals ( other: BoundingBox< T > ) : boolean {
    return this.min.equals( other.min ) && this.max.equals( other.max );
  }

  public contains ( coordinate: T ) : boolean {
    if ( this.min instanceof Coordinate && this.max instanceof Coordinate && coordinate instanceof Coordinate )
      return coordinate.latitude.value >= this.min.latitude.value && coordinate.latitude.value <= this.max.latitude.value &&
        coordinate.longitude.value >= this.min.longitude.value && coordinate.longitude.value <= this.max.longitude.value;

    if ( this.min instanceof ProjectedCoordinate && this.max instanceof ProjectedCoordinate && coordinate instanceof ProjectedCoordinate )
      return coordinate.easting >= this.min.easting && coordinate.easting <= this.max.easting &&
        coordinate.northing >= this.min.northing && coordinate.northing <= this.max.northing;

    throw new TypeError( 'Coordinates must use the same coordinate type' );
  }

  public get width () : number {
    if ( this.min instanceof Coordinate && this.max instanceof Coordinate )
      return this.max.longitude.value - this.min.longitude.value;

    return this.max.easting - this.min.easting;
  }

  public get height () : number {
    if ( this.min instanceof Coordinate && this.max instanceof Coordinate )
      return this.max.latitude.value - this.min.latitude.value;

    return this.max.northing - this.min.northing;
  }

  public static fromPoints< T extends GeometryCoordinate > ( points: readonly Point< T >[] ) : BoundingBox< T > {
    if ( points.length === 0 ) throw new RangeError( 'BoundingBox requires at least one point' );

    const first = points[ 0 ].coordinate;

    if ( first instanceof Coordinate ) {
      let minLat = first.latitude.value, maxLat = first.latitude.value,
          minLon = first.longitude.value, maxLon = first.longitude.value;

      for ( const point of points.slice( 1 ) ) {
        if ( ! ( point.coordinate instanceof Coordinate ) )
          throw new TypeError( 'Coordinates must use the same coordinate type' );

        minLat = Math.min( minLat, point.coordinate.latitude.value );
        maxLat = Math.max( maxLat, point.coordinate.latitude.value );
        minLon = Math.min( minLon, point.coordinate.longitude.value );
        maxLon = Math.max( maxLon, point.coordinate.longitude.value );
      }

      return new BoundingBox(
        Coordinate.fromDegrees( minLat, minLon ) as T,
        Coordinate.fromDegrees( maxLat, maxLon ) as T
      );
    }

    let minEasting = first.easting, maxEasting = first.easting,
        minNorthing = first.northing, maxNorthing = first.northing;

    for ( const point of points.slice( 1 ) ) {
      if ( ! ( point.coordinate instanceof ProjectedCoordinate ) )
        throw new TypeError( 'Coordinates must use the same coordinate type' );

      minEasting = Math.min( minEasting, point.coordinate.easting );
      maxEasting = Math.max( maxEasting, point.coordinate.easting );
      minNorthing = Math.min( minNorthing, point.coordinate.northing );
      maxNorthing = Math.max( maxNorthing, point.coordinate.northing );
    }

    return new BoundingBox(
      new ProjectedCoordinate( minEasting, minNorthing ) as T,
      new ProjectedCoordinate( maxEasting, maxNorthing ) as T
    );
  }
}
