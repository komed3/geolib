import type { Coordinate } from '../coordinate/Coordinate';
import type { Ellipsoid } from '../crs/Ellipsoid';
import { geodesic } from './geodesic';


export interface BearingOptions {
  readonly ellipsoid?: Ellipsoid;
}


export function bearing ( from: Coordinate, to: Coordinate, { ellipsoid }: BearingOptions = {} ) : number {
  return geodesic( from, to, ellipsoid ).initialBearing;
}
