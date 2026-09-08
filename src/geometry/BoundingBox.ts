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
}
