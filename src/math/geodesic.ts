import type { Coordinate } from '../coordinate/Coordinate';
import { Ellipsoid } from '../crs/Ellipsoid';
import { WGS84 } from '../registry/ellipsoids';
import { deg2Rad, rad2Deg } from '../utils/math';


export interface GeodesicResult {
  readonly distance: number;
  readonly initialBearing: number;
  readonly finalBearing: number;
}
