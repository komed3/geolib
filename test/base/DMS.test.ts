import { describe, expect, it } from 'vitest';
import { DMS, DIRECTION_MAP_DE, type TDirection } from '../../src/base/DMS';


const expectDMS = (
  dms: DMS, degrees: number, minutes: number,
  seconds: number, direction: TDirection
) => {
  expect( dms.degrees ).toBe( degrees );
  expect( dms.minutes ).toBe( minutes );
  expect( dms.seconds ).toBeCloseTo( seconds );
  expect( dms.direction ).toBe( direction );
};
