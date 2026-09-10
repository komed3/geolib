import { Axis } from './base/Axis';
import { AxisSet } from './base/AxisSet';
import { Coordinate } from './base/Coordinate';
import { DegreeValue } from './base/DegreeValue';
import { DMS, DMS_DIRMAP_DE, DMS_DIRMAP_EN, DMS_UNITS } from './base/DMS';
import { Range } from './base/Range';
import { System } from './base/System';
import { Value } from './base/Value';

import * as UNITS from './lib/Units';


export type { TAxisBehavior, TAxisOptions, TAxisStringOptions } from './base/Axis';
export type { TAxisSetStringOptions } from './base/AxisSet';
export type { TCoordinateStringOptions } from './base/Coordinate';
export type { TDirection, TDirectionMap, TDMS, TDMSFormat, TDMSOptions, TDMSStringOptions, TDMSUnits, TNotation } from './base/DMS';
export type { TRangeOptions, TRangeStringOptions } from './base/Range';
export type { TSystemStringOptions } from './base/System';
export type { TValueStringOptions } from './base/Value';

export type { TUnit } from './lib/Units';


export {
  Axis, AxisSet, Coordinate, DegreeValue, DMS, DMS_DIRMAP_DE, DMS_DIRMAP_EN, DMS_UNITS,
  Range, System, UNITS, Value
};


export const geolib = {
  Axis, AxisSet, Coordinate, DegreeValue, DMS, DMS_DIRMAP_DE, DMS_DIRMAP_EN, DMS_UNITS,
  Range, System, UNITS, Value
} as const;


export default geolib;
