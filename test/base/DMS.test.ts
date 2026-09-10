import { describe, expect, it } from 'vitest';
import { DMS, DIRECTION_MAP_DE, type TDirection } from '../../src/base/DMS';


const expectDMS = (
  dms: DMS, degrees: number, minutes: number,
  seconds: number, direction: TDirection | null
) => {
  expect( dms.degrees ).toBe( degrees );
  expect( dms.minutes ).toBe( minutes );
  expect( dms.seconds ).toBeCloseTo( seconds );
  expect( dms.direction ).toBe( direction );
};


describe( 'DMS', () => {
  describe( 'constructor', () => {
    it( 'creates a decimal degree value', () => {
      const dms = new DMS( 52.5 );

      expectDMS( dms, 52, 30, 0, null );
      expect( dms.toDecimals() ).toBeCloseTo( 52.5 );
    } );
  } );
} );
