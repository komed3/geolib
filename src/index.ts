import * as axis from './axis';
import * as range from './range';
import * as unit from './unit';

export * from './axis';
export * from './range';
export * from './unit';

export const geolib = { ...axis, ...range, ...unit } as const;
export default geolib;
