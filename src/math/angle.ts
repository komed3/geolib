import type { Coordinate } from '../coordinate/Coordinate';
import type { Ellipsoid } from '../crs/Ellipsoid';
import { ProjectedCoordinate } from '../projection/ProjectedCoordinate';
import { rad2Deg } from '../utils/math';
import { geodesic } from './geodesic';


export interface AngleOptions {
  readonly ellipsoid?: Ellipsoid;
}


export function angle ( a: Coordinate, b: Coordinate, c: Coordinate, { ellipsoid }: AngleOptions ) : number;
export function angle ( a: ProjectedCoordinate, b: ProjectedCoordinate, c: ProjectedCoordinate ) : number;

export function angle (
  a: Coordinate | ProjectedCoordinate, b: Coordinate | ProjectedCoordinate,
  c: Coordinate | ProjectedCoordinate, { ellipsoid }: AngleOptions = {}
) : number {
  if ( a instanceof ProjectedCoordinate && b instanceof ProjectedCoordinate && c instanceof ProjectedCoordinate ) {
    const ax = a.easting - b.easting, ay = a.northing - b.northing;
    const cx = c.easting - b.easting, cy = c.northing - b.northing;

    const denominator = Math.hypot( ax, ay ) * Math.hypot( cx, cy );
    if ( denominator === 0 ) throw new RangeError( 'Angle is undefined for coincident points' );

    const cosine = Math.max( -1, Math.min( 1, ( ax * cx + ay * cy ) / denominator ) );
    return rad2Deg( Math.acos( cosine ) );
  }

  if ( a instanceof ProjectedCoordinate || b instanceof ProjectedCoordinate || c instanceof ProjectedCoordinate )
    throw new TypeError( 'Coordinates must use the same coordinate type' );

  const first = geodesic( b, a, ellipsoid ).initialBearing;
  const second = geodesic( b, c, ellipsoid ).initialBearing;
  const difference = Math.abs( first - second );

  return Math.min( difference, 360 - difference );
}
