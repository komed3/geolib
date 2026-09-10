import { Axis } from './core/Axis';
import { AxisSet } from './core/AxisSet';
import { Coordinate } from './core/Coordinate';
import { DegreeValue } from './core/DegreeValue';
import { DMS, DMS_DIRMAP_DE, DMS_DIRMAP_EN, DMS_UNITS } from './core/DMS';
import { Range } from './core/Range';
import { System } from './core/System';
import { Value } from './core/Value';

import { Geodesy } from './lib/geodesy';
import * as UNITS from './core/Units';
import { Utils } from './lib/utils';

import { AltitudeAxis } from './ref/axis/AltitudeAxis';
import { EastingAxis } from './ref/axis/EastingAxis';
import { GeocentricXAxis } from './ref/axis/GeocentricXAxis';
import { GeocentricYAxis } from './ref/axis/GeocentricYAxis';
import { GeocentricZAxis } from './ref/axis/GeocentricZAxis';
import { HeightAxis } from './ref/axis/HeightAxis';
import { LatitudeAxis } from './ref/axis/LatitudeAxis';
import { Longitude360Axis } from './ref/axis/Longitude360Axis';
import { LongitudeAxis } from './ref/axis/LongitudeAxis';
import { NorthingAxis } from './ref/axis/NorthingAxis';

import { GeocentricCoordinate } from './ref/coordinate/GeocentricCoordinate';
import { Geographic2DCoordinate } from './ref/coordinate/Geographic2DCoordinate';
import { Geographic3DCoordinate } from './ref/coordinate/Geographic3DCoordinate';
import { Projected2DCoordinate } from './ref/coordinate/Projected2DCoordinate';
import { Projected3DCoordinate } from './ref/coordinate/Projected3DCoordinate';

import { LatitudeRange } from './ref/range/LatitudeRange';
import { Longitude360Range } from './ref/range/Longitude360Range';
import { LongitudeRange } from './ref/range/LongitudeRange';

import { GeocentricSystem } from './ref/system/GeocentricSystem';
import { Geographic2DSystem } from './ref/system/Geographic2DSystem';
import { Geographic3DSystem } from './ref/system/Geographic3DSystem';
import { Projected2DSystem } from './ref/system/Projected2DSystem';
import { Projected3DSystem } from './ref/system/Projected3DSystem';

import { Altitude } from './ref/value/Altitude';
import { Easting } from './ref/value/Easting';
import { GeocentricX } from './ref/value/GeocentricX';
import { GeocentricY } from './ref/value/GeocentricY';
import { GeocentricZ } from './ref/value/GeocentricZ';
import { Height } from './ref/value/Height';
import { Latitude } from './ref/value/Latitude';
import { Longitude } from './ref/value/Longitude';
import { Longitude360 } from './ref/value/Longitude360';
import { Northing } from './ref/value/Northing';


export type { TAxisBehavior, TAxisOptions, TAxisStringOptions } from './core/Axis';
export type { TAxisSetStringOptions } from './core/AxisSet';
export type { TCoordinateStringOptions } from './core/Coordinate';
export type { TDirection, TDirectionMap, TDMS, TDMSFormat, TDMSOptions, TDMSStringOptions, TDMSUnits, TNotation } from './core/DMS';
export type { TRangeOptions, TRangeStringOptions } from './core/Range';
export type { TSystemStringOptions } from './core/System';
export type { TValueStringOptions } from './core/Value';

export type { TUnit } from './core/Units';


export {
  Altitude, AltitudeAxis, Axis, AxisSet, Coordinate, DegreeValue, DMS, DMS_DIRMAP_DE,
  DMS_DIRMAP_EN, DMS_UNITS, Easting, EastingAxis, GeocentricCoordinate, GeocentricSystem,
  GeocentricX, GeocentricXAxis, GeocentricY, GeocentricYAxis, GeocentricZ, GeocentricZAxis,
  Geodesy, Geographic2DCoordinate, Geographic2DSystem, Geographic3DCoordinate,
  Geographic3DSystem, Height, HeightAxis, Latitude, LatitudeAxis, LatitudeRange, Longitude,
  Longitude360, Longitude360Axis, Longitude360Range, LongitudeAxis, LongitudeRange,
  Northing, NorthingAxis, Projected2DCoordinate, Projected2DSystem, Projected3DCoordinate,
  Projected3DSystem, Range, System,
  UNITS, Utils, Value
};


export const geolib = {
  Altitude, AltitudeAxis, Axis, AxisSet, Coordinate, DegreeValue, DMS, DMS_DIRMAP_DE,
  DMS_DIRMAP_EN, DMS_UNITS, Easting, EastingAxis, GeocentricCoordinate, GeocentricSystem,
  GeocentricX, GeocentricXAxis, GeocentricY, GeocentricYAxis, GeocentricZ, GeocentricZAxis,
  Geodesy, Geographic2DCoordinate, Geographic2DSystem, Geographic3DCoordinate,
  Geographic3DSystem, Height, HeightAxis, Latitude, LatitudeAxis, LatitudeRange, Longitude,
  Longitude360, Longitude360Axis, Longitude360Range, LongitudeAxis, LongitudeRange,
  Northing, NorthingAxis, Projected2DCoordinate, Projected2DSystem, Projected3DCoordinate,
  Projected3DSystem, Range, System,
  UNITS, Utils, Value
} as const;


export default geolib;
