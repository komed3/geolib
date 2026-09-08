import { Coordinate } from '../coordinate/Coordinate';
import { ProjectedCoordinate } from '../projection/ProjectedCoordinate';
import { GeometryCoordinate } from './Point';


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
}
