import type { Coordinate } from '../coordinate/Coordinate';
import type { Ellipsoid } from '../crs/Ellipsoid';
import { ProjectedCoordinate } from '../projection/ProjectedCoordinate';
import { geodesic } from './geodesic';


export interface DistanceOptions {
  readonly ellipsoid?: Ellipsoid;
}


export function distance ( a: Coordinate, b: Coordinate, { ellipsoid }?: DistanceOptions ) : number;
export function distance ( a: ProjectedCoordinate, b: ProjectedCoordinate ) : number;

export function distance (
  a: Coordinate | ProjectedCoordinate, b: Coordinate | ProjectedCoordinate,
  { ellipsoid }: DistanceOptions = {}
) : number {
  if ( a instanceof ProjectedCoordinate && b instanceof ProjectedCoordinate )
    return Math.hypot( b.easting - a.easting, b.northing - a.northing );

  if ( a instanceof ProjectedCoordinate || b instanceof ProjectedCoordinate )
    throw new TypeError( 'Coordinates must use the same coordinate type' );

  return geodesic( a, b, ellipsoid ).distance;
}
