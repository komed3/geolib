import type { Coordinate } from '../coordinate/Coordinate';
import { distance } from '../math/distance';
import { bearing } from '../math/bearing';
import type { ProjectedCoordinate } from '../projection/ProjectedCoordinate';


export type GeometryCoordinate = Coordinate | ProjectedCoordinate;
