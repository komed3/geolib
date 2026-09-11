import { AltitudeAxis } from './axis/AltitudeAxis';
import { Axis } from './axis/Axis';
import { AxisSet } from './axis/AxisSet';
import { EastingAxis } from './axis/EastingAxis';
import { GeocentricXAxis } from './axis/GeocentricXAxis';
import { GeocentricYAxis } from './axis/GeocentricYAxis';
import { GeocentricZAxis } from './axis/GeocentricZAxis';
import { HeightAxis } from './axis/HeightAxis';
import { LatitudeAxis } from './axis/LatitudeAxis';
import { Longitude360Axis } from './axis/Longitude360Axis';
import { LongitudeAxis } from './axis/LongitudeAxis';
import { NorthingAxis } from './axis/NorthingAxis';

import { Coordinate } from './coord/Coordinate';
import { GeocentricCoordinate } from './coord/GeocentricCoordinate';
import { Geographic2DCoordinate } from './coord/Geographic2DCoordinate';
import { Geographic3DCoordinate } from './coord/Geographic3DCoordinate';
import { Projected2DCoordinate } from './coord/Projected2DCoordinate';
import { Projected3DCoordinate } from './coord/Projected3DCoordinate';

import { DMS, DMS_DIRMAP_DE, DMS_DIRMAP_EN, DMS_UNITS } from './dms/DMS';

import { Airy1830Ellipsoid } from './ellipsoid/Airy1830Ellipsoid';
import { ANSEllipsoid } from './ellipsoid/ANSEllipsoid';
import { Bessel1841Ellipsoid } from './ellipsoid/Bessel1841Ellipsoid';
import { CGCS2000Ellipsoid } from './ellipsoid/CGCS2000Ellipsoid';
import { Clarke1866Ellipsoid } from './ellipsoid/Clarke1866Ellipsoid';
import { Ellipsoid } from './ellipsoid/Ellipsoid';
import { GSK2011Ellipsoid } from './ellipsoid/GSK2011Ellipsoid';
import { International1924Ellipsoid } from './ellipsoid/International1924Ellipsoid';
import { Krassowsky1940Ellipsoid } from './ellipsoid/Krassowsky1940Ellipsoid';
import { WGS84Ellipsoid } from './ellipsoid/WGS84Ellipsoid';

import * as geodesy from './lib/geodesy';
import * as units from './lib/units';
import * as utils from './lib/utils';

import { LatitudeRange } from './range/LatitudeRange';
import { Longitude360Range } from './range/Longitude360Range';
import { LongitudeRange } from './range/LongitudeRange';
import { Range } from './range/Range';

import { GeocentricSystem } from './system/GeocentricSystem';
import { Geographic2DSystem } from './system/Geographic2DSystem';
import { Geographic3DSystem } from './system/Geographic3DSystem';
import { Projected2DSystem } from './system/Projected2DSystem';
import { Projected3DSystem } from './system/Projected3DSystem';
import { System } from './system/System';

import { Altitude } from './value/Altitude';
import { DegreeValue } from './value/DegreeValue';
import { Easting } from './value/Easting';
import { GeocentricX } from './value/GeocentricX';
import { GeocentricY } from './value/GeocentricY';
import { GeocentricZ } from './value/GeocentricZ';
import { Height } from './value/Height';
import { Latitude } from './value/Latitude';
import { Longitude } from './value/Longitude';
import { Longitude360 } from './value/Longitude360';
import { Northing } from './value/Northing';
import { Value } from './value/Value';


export type { TAxisBehavior, TAxisOptions, TAxisStringOptions } from './axis/Axis';
export type { TAxisSetStringOptions } from './axis/AxisSet';
export type { TCoordinateStringOptions } from './coord/Coordinate';
export type { TDirection, TDirectionMap, TDMS, TDMSFormat, TDMSOptions, TDMSStringOptions, TDMSUnits, TNotation } from './dms/DMS';
export type { TEllipsoidOptions, TEllipsoidStringOptions } from './ellipsoid/Ellipsoid';
export type { TUnit } from './lib/units';
export type { TRangeOptions, TRangeStringOptions } from './range/Range';
export type { TSystemStringOptions } from './system/System';
export type { TValueStringOptions } from './value/Value';


export {
  Airy1830Ellipsoid, Altitude, AltitudeAxis, ANSEllipsoid, Axis, AxisSet, Bessel1841Ellipsoid,
  CGCS2000Ellipsoid, Clarke1866Ellipsoid, Coordinate, DegreeValue, DMS, DMS_DIRMAP_DE,
  DMS_DIRMAP_EN, DMS_UNITS, Easting, EastingAxis, Ellipsoid, GeocentricCoordinate,
  GeocentricSystem, GeocentricX, GeocentricXAxis, GeocentricY, GeocentricYAxis, GeocentricZ,
  GeocentricZAxis, geodesy, Geographic2DCoordinate, Geographic2DSystem, Geographic3DCoordinate,
  Geographic3DSystem, GSK2011Ellipsoid, Height, HeightAxis, International1924Ellipsoid,
  Krassowsky1940Ellipsoid, Latitude, LatitudeAxis, LatitudeRange, Longitude, Longitude360,
  Longitude360Axis, Longitude360Range, LongitudeAxis, LongitudeRange, Northing, NorthingAxis,
  Projected2DCoordinate, Projected2DSystem, Projected3DCoordinate, Projected3DSystem, Range,
  System, units, utils, Value, WGS84Ellipsoid
};


export const geolib = {
  Airy1830Ellipsoid, Altitude, AltitudeAxis, ANSEllipsoid, Axis, AxisSet, Bessel1841Ellipsoid,
  CGCS2000Ellipsoid, Clarke1866Ellipsoid, Coordinate, DegreeValue, DMS, DMS_DIRMAP_DE,
  DMS_DIRMAP_EN, DMS_UNITS, Easting, EastingAxis, Ellipsoid, GeocentricCoordinate,
  GeocentricSystem, GeocentricX, GeocentricXAxis, GeocentricY, GeocentricYAxis, GeocentricZ,
  GeocentricZAxis, geodesy, Geographic2DCoordinate, Geographic2DSystem, Geographic3DCoordinate,
  Geographic3DSystem, GSK2011Ellipsoid, Height, HeightAxis, International1924Ellipsoid,
  Krassowsky1940Ellipsoid, Latitude, LatitudeAxis, LatitudeRange, Longitude, Longitude360,
  Longitude360Axis, Longitude360Range, LongitudeAxis, LongitudeRange, Northing, NorthingAxis,
  Projected2DCoordinate, Projected2DSystem, Projected3DCoordinate, Projected3DSystem, Range,
  System, units, utils, Value, WGS84Ellipsoid
} as const;


export default geolib;
