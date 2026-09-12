import { describe, expect, it } from 'vitest';
import { DMS, DMS_DIRMAP_DE, type DMSDirection } from '../src/dms/DMS';


const expectDMS = ( dms: DMS, deg: number, min: number, sec: number, dir?: DMSDirection ) => {
  expect( dms.degrees ).toBe( deg );
  expect( dms.minutes ).toBe( min );
  expect( dms.seconds ).toBeCloseTo( sec );
  expect( dms.direction ).toBe( dir );
};
