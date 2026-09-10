import { Axis } from './base/Axis';
import { AxisSet } from './base/AxisSet';
import { Coordinate } from './base/Coordinate';
import { DegreeValue } from './base/DegreeValue';
import { DMS, DMS_DIRMAP_DE, DMS_DIRMAP_EN, DMS_UNITS } from './base/DMS';
import { Range } from './base/Range';
import { System } from './base/System';
import { Value } from './base/Value';

import { Geodesy } from './lib/Geodesy';
import * as UNITS from './lib/Units';
import { Utils } from './lib/Utils';

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


export type { TAxisBehavior, TAxisOptions, TAxisStringOptions } from './base/Axis';
export type { TAxisSetStringOptions } from './base/AxisSet';
export type { TCoordinateStringOptions } from './base/Coordinate';
export type { TDirection, TDirectionMap, TDMS, TDMSFormat, TDMSOptions, TDMSStringOptions, TDMSUnits, TNotation } from './base/DMS';
export type { TRangeOptions, TRangeStringOptions } from './base/Range';
export type { TSystemStringOptions } from './base/System';
export type { TValueStringOptions } from './base/Value';

export type { TUnit } from './lib/Units';


export {
  AltitudeAxis, Axis, AxisSet, Coordinate, DegreeValue, DMS, DMS_DIRMAP_DE, DMS_DIRMAP_EN,
  DMS_UNITS, EastingAxis, GeocentricXAxis, GeocentricYAxis, GeocentricZAxis, Geodesy,
  HeightAxis, LatitudeAxis, Longitude360Axis, LongitudeAxis, NorthingAxis, Range, System,
  UNITS, Utils, Value
};


export const geolib = {
  AltitudeAxis, Axis, AxisSet, Coordinate, DegreeValue, DMS, DMS_DIRMAP_DE, DMS_DIRMAP_EN,
  DMS_UNITS, EastingAxis, GeocentricXAxis, GeocentricYAxis, GeocentricZAxis, Geodesy,
  HeightAxis, LatitudeAxis, Longitude360Axis, LongitudeAxis, NorthingAxis, Range, System,
  UNITS, Utils, Value
} as const;


export default geolib;
