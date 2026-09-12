import * as axis from './axis';
import * as coord from './coord';
import * as crs from './crs';
import * as datum from './datum';
import * as dms from './dms';
import * as ellipsoid from './ellipsoid';
import * as math from './math';
import * as primem from './primem';
import * as range from './range';
import * as system from './system';
import * as tile from './tile';
import * as unit from './unit';
import * as value from './value';

export * from './axis';
export * from './coord';
export * from './crs';
export * from './datum';
export * from './dms';
export * from './ellipsoid';
export * from './math';
export * from './primem';
export * from './range';
export * from './system';
export * from './tile';
export * from './unit';
export * from './value';

export {
  axis, coord, crs, datum, dms, ellipsoid, math,
  primem, range, system, tile, unit, value
};

export const geolib = {
  ...axis, ...coord, ...dms, ...ellipsoid, ...primem,
  ...range, ...system, ...unit, ...value
} as const;

export default geolib;
