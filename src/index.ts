import * as axis from './axis';
import * as dms from './dms';
import * as ellipsoid from './ellipsoid';
import * as primem from './primem';
import * as range from './range';
import * as unit from './unit';
import * as value from './value';

export * from './axis';
export * from './dms';
export * from './ellipsoid';
export * from './primem';
export * from './range';
export * from './unit';
export * from './value';

export {
  axis, dms, ellipsoid, primem, range, unit, value
};

export const geolib = {
  ...axis, ...dms, ...ellipsoid, ...primem, ...range, ...unit, ...value
} as const;

export default geolib;
