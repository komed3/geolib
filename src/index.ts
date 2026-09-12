import * as axis from './axis';
import * as range from './range';
import * as unit from './unit';
import * as value from './value';

export * from './axis';
export * from './range';
export * from './unit';
export * from './value';

export { axis, range, unit, value };

export const geolib = { ...axis, ...range, ...unit, ...value } as const;
export default geolib;
