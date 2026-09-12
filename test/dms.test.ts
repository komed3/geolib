import { describe, expect, it } from 'vitest';
import { DMS, DMS_DIRMAP_DE, type DMSDirection } from '../src/dms/DMS';


const expectDMS = ( dms: DMS, deg: number, min: number, sec: number, dir?: DMSDirection ) => {
  expect( dms.degrees ).toBe( deg );
  expect( dms.minutes ).toBe( min );
  expect( dms.seconds ).toBeCloseTo( sec );
  expect( dms.direction ).toBe( dir );
};


describe( 'DMS', () => {
  describe( 'constructor', () => {
    it( 'creates a value from degrees', () => {
      const dms = new DMS( 52 );

      expectDMS( dms, 52, 0, 0 );
      expect( dms.value ).toBeCloseTo( 52 );
    } );

    it( 'creates a value from degrees, minutes and seconds', () => {
      const dms = new DMS( 52, 30, 15 );

      expectDMS( dms, 52, 30, 15 );
      expect( dms.value ).toBeCloseTo( 52.50416666666667 );
    } );

    it( 'normalizes overflowing seconds', () => {
      const dms = new DMS( 52, 30, 90 );

      expectDMS( dms, 52, 31, 30 );
      expect( dms.value ).toBeCloseTo( 52.525 );
    } );

    it( 'normalizes overflowing minutes', () => {
      const dms = new DMS( 52, 90 );

      expectDMS( dms, 53, 30, 0 );
      expect( dms.value ).toBeCloseTo( 53.5 );
    } );

    it( 'normalizes overflowing minutes and seconds', () => {
      const dms = new DMS( 52, 90, 120 );

      expectDMS( dms, 53, 32, 0 );
      expect( dms.value ).toBeCloseTo( 53.53333333333333 );
    } );

    it( 'preserves a negative value without direction', () => {
      const dms = new DMS( -52, 30, 15 );

      expectDMS( dms, -51, 29, 45 );
      expect( dms.value ).toBeCloseTo( -51.49583333333333 );
    } );

    it.each( [
      [ 'north', 52.50416666666667 ], [ 'east', 52.50416666666667 ],
      [ 'south', -52.50416666666667 ], [ 'west', -52.50416666666667 ]
    ] as const )( 'handles %s direction', ( direction, expected ) => {
      const dms = new DMS( 52, 30, 15, direction );

      expectDMS( dms, 52, 30, 15, direction );
      expect( dms.value ).toBeCloseTo( expected );
    } );

    it( 'rejects a negative value with a direction', () => {
      expect( () => new DMS( -52, 30, 15, 'north' ) ).toThrow(
        'DMS value has conflicting sign and direction'
      );
    } );
  } );

  describe( 'equals', () => {
    it( 'returns true for equal values', () => {
      expect( new DMS( 52, 30, 15 ).equals( new DMS( 52, 30, 15 ) ) ).toBe( true );
    } );

    it( 'returns false for different values', () => {
      expect( new DMS( 52, 30, 15 ).equals( new DMS( 52, 30, 16 ) ) ).toBe( false );
    } );

    it( 'returns false for different directions', () => {
      expect( new DMS( 52, 30, 15, 'north' ).equals( new DMS( 52, 30, 15, 'south' ) ) ).toBe( false );
    } );

    it( 'returns false when only one value has a direction', () => {
      expect( new DMS( 52, 30, 15 ).equals( new DMS( 52, 30, 15, 'north' ) ) ).toBe( false );
    } );
  } );

  describe( 'clone', () => {
    it( 'creates an equal independent instance', () => {
      const dms = new DMS( 52, 30, 15, 'south' );
      const clone = dms.clone();

      expect( clone ).not.toBe( dms );
      expect( clone.equals( dms ) ).toBe( true );
    } );

    it( 'preserves all components', () => {
      const clone = new DMS( 52, 30, 15, 'west' ).clone();

      expectDMS( clone, 52, 30, 15, 'west' );
      expect( clone.value ).toBeCloseTo( -52.50416666666667 );
    } );
  } );
} );
