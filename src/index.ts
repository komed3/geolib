import { Coordinate } from './coordinate/Coordinate';
import { DMS, type DMSDirection } from './coordinate/DMS';
import { Latitude } from './coordinate/Latitude';
import { Longitude } from './coordinate/Longitude';

import type { AxisDirection, AxisUnit, CoordinateAxis, CoordinateSystemType } from './crs/CoordinateSystem';
import { CoordinateSystem } from './crs/CoordinateSystem';
import { CRS, type CRSType } from './crs/CRS';
import { Datum } from './crs/Datum';
import { Ellipsoid } from './crs/Ellipsoid';
import { Projection } from './crs/Projection';

import {
  CLARKE1866, crs, CRSRegistry, DatumRegistry, datums, EllipsoidRegistry, ellipsoids, ETRS89,
  ETRS89_D, GRS80, NAD83, Registry, WEB_MERCATOR, WGS84, WGS84_D, WGS84_E, WGS84_UTM32N
} from './registry';


export {
  AxisDirection, AxisUnit, CLARKE1866, Coordinate, CoordinateAxis, CoordinateSystem,
  CoordinateSystemType, CRS, crs, CRSRegistry, CRSType, Datum, DatumRegistry, datums,
  DMS, DMSDirection, Ellipsoid, EllipsoidRegistry, ellipsoids, ETRS89, ETRS89_D, GRS80,
  Latitude, Longitude, NAD83, Projection, Registry, WEB_MERCATOR, WGS84, WGS84_D,
  WGS84_E, WGS84_UTM32N
};


export const geolib = {
  Coordinate, CoordinateSystem, CRS, Datum, DMS, Ellipsoid, Latitude, Longitude, Projection,
  CRSRegistry, DatumRegistry, EllipsoidRegistry, Registry,
  registry: { crs, datums, ellipsoids },
  crs: { WGS84, ETRS89, WEB_MERCATOR, WGS84_UTM32N },
  ellipsoid: { WGS84: WGS84_E, GRS80, CLARKE1866 },
  datum: { WGS84: WGS84_D, ETRS89: ETRS89_D, NAD83 }
};

export default geolib;
