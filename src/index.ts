import { Coordinate, type Tuple } from './coordinate/Coordinate';
import { DMS, type DMSDirection } from './coordinate/DMS';
import { Latitude } from './coordinate/Latitude';
import { Longitude } from './coordinate/Longitude';

import type { AxisDirection, AxisUnit, CoordinateAxis, CoordinateSystemType } from './crs/CoordinateSystem';
import { CoordinateSystem } from './crs/CoordinateSystem';
import { CRS, type CRSType } from './crs/CRS';
import { Datum } from './crs/Datum';
import { Ellipsoid } from './crs/Ellipsoid';

import { angle, type AngleOptions } from './math/angle';
import { bearing, type BearingOptions } from './math/bearing';
import { distance, type DistanceOptions } from './math/distance';

import { Mercator } from './projection/Mercator';
import { ProjectedCoordinate, type ProjectedTuple } from './projection/ProjectedCoordinate';
import { SphericalMercator } from './projection/SphericalMercator';
import { TransverseMercator } from './projection/TransverseMercator';

import {
  CLARKE1866, crs, CRSRegistry, DatumRegistry, datums, EllipsoidRegistry, ellipsoids,
  ETRS89, ETRS89_D, GRS80, NAD83, WEB_MERCATOR, WGS84, WGS84_D, WGS84_E, WGS84_UTM32N
} from './registry';


export {
  angle, AngleOptions, AxisDirection, AxisUnit, bearing, BearingOptions, CLARKE1866,
  Coordinate, CoordinateAxis, CoordinateSystem, CoordinateSystemType, CRS, crs, CRSRegistry,
  CRSType, Datum, DatumRegistry, datums, distance, DistanceOptions, DMS, DMSDirection,
  Ellipsoid, EllipsoidRegistry, ellipsoids, ETRS89, ETRS89_D, GRS80, Latitude, Longitude,
  Mercator, NAD83, ProjectedCoordinate, ProjectedTuple, SphericalMercator, TransverseMercator,
  Tuple, WEB_MERCATOR, WGS84, WGS84_D, WGS84_E, WGS84_UTM32N
};


export const geolib = {
  Coordinate, DMS, Latitude, Longitude,
  CoordinateSystem, CRS, Datum, Ellipsoid,
  Mercator, ProjectedCoordinate, SphericalMercator, TransverseMercator,
  CRSRegistry, DatumRegistry, EllipsoidRegistry,
  angle, bearing, distance,
  registry: { crs, datums, ellipsoids },
  crs: { WGS84, ETRS89, WEB_MERCATOR, WGS84_UTM32N },
  ellipsoid: { WGS84: WGS84_E, GRS80, CLARKE1866 },
  datum: { WGS84: WGS84_D, ETRS89: ETRS89_D, NAD83 }
};

export default geolib;
