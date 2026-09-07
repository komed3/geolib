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
