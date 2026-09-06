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


export {
  AxisDirection, AxisUnit, Coordinate, CoordinateAxis, CoordinateSystem, CoordinateSystemType,
  CRS, CRSType, Datum, DMS, DMSDirection, Ellipsoid, Latitude, Longitude, Projection
};


export const geolib = {
  Coordinate, CoordinateSystem, CRS, Datum, DMS, Ellipsoid, Latitude, Longitude, Projection
};

export default geolib;
