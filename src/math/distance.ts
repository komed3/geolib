import type { Coordinate } from '../coordinate/Coordinate';
import type { Ellipsoid } from '../crs/Ellipsoid';
import { ProjectedCoordinate } from '../projection/ProjectedCoordinate';
import { geodesic } from './geodesic';


export interface DistanceOptions {
  readonly ellipsoid?: Ellipsoid;
}


