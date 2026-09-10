import { describe, expect, it } from 'vitest';
import { DMS, DIRECTION_MAP_DE, type TDirection } from '../../src/base/DMS';


const expectDMS = ( dms: DMS, deg: number, min: number, sec: number, dir: TDirection | null ) => {
  expect( dms.degrees ).toBe( deg );
  expect( dms.minutes ).toBe( min );
  expect( dms.seconds ).toBeCloseTo( sec );
  expect( dms.direction ).toBe( dir );
};
