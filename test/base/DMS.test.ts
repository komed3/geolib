import { describe, expect, it } from 'vitest';
import { DMS, DIRECTION_MAP_DE, type TDirection } from '../../src/base/DMS';


const expectDMS = ( dms: DMS, deg: number, min: number, sec: number, dir: TDirection | null ) => {
  expect( dms.degrees ).toBe( deg );
  expect( dms.minutes ).toBe( min );
  expect( dms.seconds ).toBeCloseTo( sec );
  expect( dms.direction ).toBe( dir );
};


describe( 'DMS', () => {
  describe( 'constructor', () => {
    it( 'creates a value from degrees', () => {
      const dms = new DMS( 52 );

      expectDMS( dms, 52, 0, 0, null );
      expect( dms.value ).toBeCloseTo( 52 );
    } );

    it( 'creates a value from degrees, minutes and seconds', () => {
      const dms = new DMS( 52, 30, 15 );

      expectDMS( dms, 52, 30, 15, null );
      expect( dms.value ).toBeCloseTo( 52.50416666666667 );
    } );

    it( 'normalizes overflowing seconds', () => {
      const dms = new DMS( 52, 30, 90 );

      expectDMS( dms, 52, 31, 30, null );
      expect( dms.value ).toBeCloseTo( 52.525 );
    } );

    it( 'normalizes overflowing minutes', () => {
      const dms = new DMS( 52, 90 );

      expectDMS( dms, 53, 30, 0, null );
      expect( dms.value ).toBeCloseTo( 53.5 );
    } );

    it( 'normalizes overflowing minutes and seconds', () => {
      const dms = new DMS( 52, 90, 120 );

      expectDMS( dms, 53, 32, 0, null );
      expect( dms.value ).toBeCloseTo( 53.53333333333333 );
    } );

    it( 'preserves a negative value without direction', () => {
      const dms = new DMS( -52, 30, 15 );

      expectDMS( dms, -51, 29, 45, null );
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

  describe( 'toJSON', () => {
    it( 'returns all components and the decimal value', () => {
      const json = new DMS( 52, 30, 15, 'north' ).toJSON();

      expect( json.value ).toBeCloseTo( 52.50416666666667 );
      expect( json.degrees ).toBe( 52 );
      expect( json.minutes ).toBe( 30 );
      expect( json.seconds ).toBeCloseTo( 15 );
      expect( json.direction ).toBe( 'north' );
    } );

    it( 'returns a null direction when no direction was provided', () => {
      const json = new DMS( 52, 30, 15 ).toJSON();

      expect( json.value ).toBeCloseTo( 52.50416666666667 );
      expect( json.direction ).toBeNull();
    } );
  } );

  describe( 'toString', () => {
    it( 'formats DMS by default', () => {
      expect( new DMS( 52, 30, 15, 'north' ).toString() ).toBe( '52° 30′ 15″ N' );
    } );

    it( 'formats degrees only', () => {
      expect( new DMS( 52, 30, 15, 'north' ).toString( { format: 'dd' } ) ).toBe( '52.5° N' );
    } );

    it( 'formats degrees and minutes', () => {
      expect( new DMS( 52, 30, 15, 'north' ).toString( { format: 'dm' } ) ).toBe( '52° 30.25′ N' );
    } );

    it( 'formats signed notation', () => {
      expect( new DMS( 52, 30, 15, 'south' ).toString( { notation: 'signed' } ) ).toBe( '-52° 30′ 15″' );
    } );

    it( 'formats directional notation', () => {
      expect( new DMS( 52, 30, 15, 'west' ).toString( { notation: 'directional' } ) ).toBe( '52° 30′ 15″ W' );
    } );

    it( 'uses a custom delimiter', () => {
      expect( new DMS( 52, 30, 15, 'north' ).toString( { delimiter: '/' } ) ).toBe( '52°/30′/15″/N' );
    } );

    it( 'can hide units', () => {
      expect( new DMS( 52, 30, 15, 'north' ).toString( { showUnit: false } ) ).toBe( '52 30 15 N' );
    } );

    it( 'uses a custom direction map', () => {
      expect( new DMS( 52, 30, 15, 'east' ).toString( { dirMap: DIRECTION_MAP_DE } ) ).toBe( '52° 30′ 15″ O' );
    } );

    it( 'formats seconds with the requested precision', () => {
      const dms = new DMS( 52, 30, 15.678 );

      expect( dms.toString( { precision: 0 } ) ).toBe( '52° 30′ 16″' );
      expect( dms.toString( { precision: 1 } ) ).toBe( '52° 30′ 15.7″' );
      expect( dms.toString( { precision: 2 } ) ).toBe( '52° 30′ 15.68″' );
    } );

    it( 'carries rounded seconds into minutes', () => {
      expect( new DMS( 52, 30, 59.999 ).toString( { precision: 0 } ) ).toBe( '52° 31′ 0″' );
    } );

    it( 'carries rounded minutes into degrees', () => {
      expect( new DMS( 52, 59.999 ).toString( { format: 'dm', precision: 0 } ) ).toBe( '53° 0′' );
    } );

    it( 'omits the direction when no direction exists', () => {
      expect( new DMS( 52, 30, 15 ).toString() ).toBe( '52° 30′ 15″' );
    } );

    it( 'uses the sign for negative values without direction', () => {
      expect( new DMS( -52, 30, 15 ).toString() ).toBe( '-51° 29′ 45″' );
    } );

    it( 'uses the configured locale', () => {
      expect( new DMS( 52, 30, 15.5, 'north' ).toString( { locale: 'de' } ) ).toBe( '52° 30′ 15,5″ N' );
    } );
  } );

  describe( 'fromDecimals', () => {
    it( 'creates a DMS from a decimal value', () => {
      const dms = DMS.fromDecimals( 52.50416666666667 );

      expectDMS( dms, 52, 30, 15, null );
      expect( dms.value ).toBeCloseTo( 52.50416666666667 );
    } );

    it( 'creates a DMS with a direction', () => {
      const dms = DMS.fromDecimals( 52.50416666666667, 'west' );

      expectDMS( dms, 52, 30, 15, 'west' );
      expect( dms.value ).toBeCloseTo( -52.50416666666667 );
    } );
  } );

  describe( 'fromLongitude', () => {
    it( 'creates an east longitude from a positive value', () => {
      const dms = DMS.fromLongitude( 52.50416666666667 );

      expectDMS( dms, 52, 30, 15, 'east' );
      expect( dms.value ).toBeCloseTo( 52.50416666666667 );
    } );

    it( 'creates a west longitude from a negative value', () => {
      const dms = DMS.fromLongitude( -52.50416666666667 );

      expectDMS( dms, 52, 30, 15, 'west' );
      expect( dms.value ).toBeCloseTo( -52.50416666666667 );
    } );

    it( 'creates east for zero', () => {
      const dms = DMS.fromLongitude( 0 );

      expectDMS( dms, 0, 0, 0, 'east' );
      expect( dms.value ).toBeCloseTo( 0 );
    } );
  } );


  describe( 'fromLatitude', () => {
    it( 'creates a north latitude from a positive value', () => {
      const dms = DMS.fromLatitude( 52.50416666666667 );

      expectDMS( dms, 52, 30, 15, 'north' );
      expect( dms.value ).toBeCloseTo( 52.50416666666667 );
    } );

    it( 'creates a south latitude from a negative value', () => {
      const dms = DMS.fromLatitude( -52.50416666666667 );

      expectDMS( dms, 52, 30, 15, 'south' );
      expect( dms.value ).toBeCloseTo( -52.50416666666667 );
    } );

    it( 'creates north for zero', () => {
      const dms = DMS.fromLatitude( 0 );

      expectDMS( dms, 0, 0, 0, 'north' );
      expect( dms.value ).toBeCloseTo( 0 );
    } );
  } );

  describe( 'fromObject', () => {
    it( 'creates a DMS from an object', () => {
      const dms = DMS.fromObject( { degrees: 52, minutes: 30, seconds: 15, direction: 'south' } );

      expectDMS( dms, 52, 30, 15, 'south' );
      expect( dms.value ).toBeCloseTo( -52.50416666666667 );
    } );

    it( 'uses zero for omitted components', () => {
      expectDMS( DMS.fromObject( { degrees: 52 } ), 52, 0, 0, null );
    } );
  } );
} );
