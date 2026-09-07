import { describe, expect, it } from 'vitest';

import { DMS } from '../../src/coordinate/DMS';


describe( 'DMS', () => {
  describe( 'constructor', () => {
    it( 'accepts valid values', () => {
      const value = new DMS( 50, 49, 37.2, 'N' );

      expect( value.degrees ).toBe( 50 );
      expect( value.minutes ).toBe( 49 );
      expect( value.seconds ).toBe( 37.2 );
      expect( value.direction ).toBe( 'N' );
    } );

    it( 'accepts all directions', () => {
      expect( new DMS( 0, 0, 0, 'N' ).direction ).toBe( 'N' );
      expect( new DMS( 0, 0, 0, 'S' ).direction ).toBe( 'S' );
      expect( new DMS( 0, 0, 0, 'E' ).direction ).toBe( 'E' );
      expect( new DMS( 0, 0, 0, 'W' ).direction ).toBe( 'W' );
    } );

    it( 'rejects negative degrees', () => {
      expect( () => new DMS( -1, 0, 0, 'N' ) ).toThrow( RangeError );
    } );

    it( 'rejects non-integer degrees', () => {
      expect( () => new DMS( 50.5, 0, 0, 'N' ) ).toThrow( RangeError );
    } );

    it( 'rejects invalid minutes', () => {
      expect( () => new DMS( 50, -1, 0, 'N' ) ).toThrow( RangeError );
      expect( () => new DMS( 50, 60, 0, 'N' ) ).toThrow( RangeError );
      expect( () => new DMS( 50, 1.5, 0, 'N' ) ).toThrow( RangeError );
    } );

    it( 'rejects invalid seconds', () => {
      expect( () => new DMS( 50, 0, -1, 'N' ) ).toThrow( RangeError );
      expect( () => new DMS( 50, 0, 60, 'N' ) ).toThrow( RangeError );
      expect( () => new DMS( 50, 0, NaN, 'N' ) ).toThrow( RangeError );
      expect( () => new DMS( 50, 0, Infinity, 'N' ) ).toThrow( RangeError );
    } );

    it( 'rejects invalid directions', () => {
      expect( () => new DMS( 50, 0, 0, 'X' as never ) ).toThrow( RangeError );
    } );

    it( 'accepts latitude limits', () => {
      expect( new DMS( 90, 0, 0, 'N' ).degrees ).toBe( 90 );
      expect( new DMS( 90, 0, 0, 'S' ).degrees ).toBe( 90 );
    } );

    it( 'accepts longitude limits', () => {
      expect( new DMS( 180, 0, 0, 'E' ).degrees ).toBe( 180 );
      expect( new DMS( 180, 0, 0, 'W' ).degrees ).toBe( 180 );
    } );

    it( 'rejects values beyond latitude limits', () => {
      expect( () => new DMS( 91, 0, 0, 'N' ) ).toThrow( RangeError );
      expect( () => new DMS( 180, 0, 0, 'N' ) ).toThrow( RangeError );
    } );

    it( 'rejects values beyond longitude limits', () => {
      expect( () => new DMS( 181, 0, 0, 'E' ) ).toThrow( RangeError );
    } );

    it( 'rejects minutes and seconds at the maximum degree', () => {
      expect( () => new DMS( 90, 1, 0, 'N' ) ).toThrow( RangeError );
      expect( () => new DMS( 90, 0, 1, 'N' ) ).toThrow( RangeError );
      expect( () => new DMS( 180, 1, 0, 'E' ) ).toThrow( RangeError );
      expect( () => new DMS( 180, 0, 1, 'E' ) ).toThrow( RangeError );
    } );
  } );

  describe( 'conversion', () => {
    it( 'converts north and east values to positive decimal degrees', () => {
      expect( new DMS( 50, 49, 37.2, 'N' ).toDecimal() ).toBeCloseTo( 50.827 );
      expect( new DMS( 12, 55, 15.6, 'E' ).toDecimal() ).toBeCloseTo( 12.921 );
    } );

    it( 'converts south and west values to negative decimal degrees', () => {
      expect( new DMS( 50, 49, 37.2, 'S' ).toDecimal() ).toBeCloseTo( -50.827 );
      expect( new DMS( 12, 55, 15.6, 'W' ).toDecimal() ).toBeCloseTo( -12.921 );
    } );

    it( 'converts to radians', () => {
      expect( new DMS( 180, 0, 0, 'E' ).toRadians() ).toBeCloseTo( Math.PI );
      expect( new DMS( 90, 0, 0, 'S' ).toRadians() ).toBeCloseTo( -Math.PI / 2 );
    } );

    it( 'creates DMS from decimal degrees', () => {
      const value = DMS.fromDecimal( 50.827, 'N' );

      expect( value.degrees ).toBe( 50 );
      expect( value.minutes ).toBe( 49 );
      expect( value.seconds ).toBeCloseTo( 37.2 );
      expect( value.direction ).toBe( 'N' );
    } );

    it( 'uses the absolute value when creating DMS', () => {
      const value = DMS.fromDecimal( -50.827, 'S' );

      expect( value.degrees ).toBe( 50 );
      expect( value.minutes ).toBe( 49 );
      expect( value.seconds ).toBeCloseTo( 37.2 );
      expect( value.toDecimal() ).toBeCloseTo( -50.827 );
    } );

    it( 'rejects non-finite decimal values', () => {
      expect( () => DMS.fromDecimal( NaN, 'N' ) ).toThrow( TypeError );
      expect( () => DMS.fromDecimal( Infinity, 'N' ) ).toThrow( TypeError );
    } );

    it( 'rejects decimal values outside the valid range', () => {
      expect( () => DMS.fromDecimal( 90.001, 'N' ) ).toThrow( RangeError );
      expect( () => DMS.fromDecimal( -90.001, 'S' ) ).toThrow( RangeError );
      expect( () => DMS.fromDecimal( 180.001, 'E' ) ).toThrow( RangeError );
    } );

    it( 'creates DMS from radians', () => {
      const value = DMS.fromRadians( Math.PI / 4, 'N' );

      expect( value.degrees ).toBe( 45 );
      expect( value.minutes ).toBe( 0 );
      expect( value.seconds ).toBeCloseTo( 0 );
      expect( value.direction ).toBe( 'N' );
    } );

    it( 'creates latitude DMS with the correct direction', () => {
      expect( DMS.fromLatitude( 50 ).direction ).toBe( 'N' );
      expect( DMS.fromLatitude( -50 ).direction ).toBe( 'S' );
      expect( DMS.fromLatitude( 0 ).direction ).toBe( 'N' );
    } );

    it( 'creates longitude DMS with the correct direction', () => {
      expect( DMS.fromLongitude( 12 ).direction ).toBe( 'E' );
      expect( DMS.fromLongitude( -12 ).direction ).toBe( 'W' );
      expect( DMS.fromLongitude( 0 ).direction ).toBe( 'E' );
    } );
  } );

  describe( 'string representation', () => {
    it( 'formats DMS values', () => {
      const value = new DMS( 50, 49, 37.2, 'N' );

      expect( value.toString() ).toBe( '50° 49′ 37.2″ N' );
    } );

    it( 'formats seconds with the requested precision', () => {
      const value = new DMS( 50, 49, 37.23456, 'N' );

      expect( value.toString( { precision: 2 } ) ).toBe( '50° 49′ 37.23″ N' );
      expect( value.toString( { precision: 0 } ) ).toBe( '50° 49′ 37″ N' );
    } );

    it( 'supports a custom delimiter', () => {
      const value = new DMS( 50, 49, 37.2, 'N' );

      expect( value.toString( { delimiter: ':' } ) ).toBe( '50°:49′:37.2″:N' );
    } );

    it( 'carries rounded seconds into the next minute', () => {
      const value = new DMS( 50, 59, 59.999, 'N' );

      expect( value.toString( { precision: 2 } ) ).toBe( '51° 0′ 0″ N' );
    } );

    it( 'carries rounded minutes into the next degree', () => {
      const value = new DMS( 50, 59, 59.999, 'N' );

      expect( value.toString( { precision: 0 } ) ).toBe( '51° 0′ 0″ N' );
    } );
  } );

  describe( 'parser', () => {
    it( 'parses a full DMS value', () => {
      const value = DMS.parse( '50° 49′ 37.2″ N' );

      expect( value.degrees ).toBe( 50 );
      expect( value.minutes ).toBe( 49 );
      expect( value.seconds ).toBeCloseTo( 37.2 );
      expect( value.direction ).toBe( 'N' );
    } );

    it( 'parses ASCII symbols', () => {
      const value = DMS.parse( '50° 49\' 37.2" N' );

      expect( value.equals( new DMS( 50, 49, 37.2, 'N' ) ) ).toBe( true );
    } );

    it( 'parses compact values', () => {
      expect( DMS.parse( '50N' ).equals( new DMS( 50, 0, 0, 'N' ) ) ).toBe( true );
      expect( DMS.parse( '50°N' ).equals( new DMS( 50, 0, 0, 'N' ) ) ).toBe( true );
      expect( DMS.parse( '50°49N' ).equals( new DMS( 50, 49, 0, 'N' ) ) ).toBe( true );
      expect( DMS.parse( '50°49′N' ).equals( new DMS( 50, 49, 0, 'N' ) ) ).toBe( true );
    } );

    it( 'parses lowercase directions', () => {
      expect( DMS.parse( '50n' ).direction ).toBe( 'N' );
      expect( DMS.parse( '12w' ).direction ).toBe( 'W' );
    } );

    it( 'ignores surrounding whitespace', () => {
      const value = DMS.parse( '  50° 49′ 37.2″ N  ' );

      expect( value.equals( new DMS( 50, 49, 37.2, 'N' ) ) ).toBe( true );
    } );

    it( 'rejects invalid syntax', () => {
      expect( () => DMS.parse( '' ) ).toThrow( SyntaxError );
      expect( () => DMS.parse( '50' ) ).toThrow( SyntaxError );
      expect( () => DMS.parse( 'foo' ) ).toThrow( SyntaxError );
      expect( () => DMS.parse( '50° 49′ 37.2″' ) ).toThrow( SyntaxError );
    } );

    it( 'rejects invalid semantic values', () => {
      expect( () => DMS.parse( '90° 1′ N' ) ).toThrow( RangeError );
      expect( () => DMS.parse( '180° 1′ E' ) ).toThrow( RangeError );
      expect( () => DMS.parse( '50° 60′ N' ) ).toThrow( RangeError );
      expect( () => DMS.parse( '50° 0′ 60″ N' ) ).toThrow( RangeError );
    } );
  } );

  describe( 'object behavior', () => {
    it( 'clones a DMS value', () => {
      const value = new DMS( 50, 49, 37.2, 'N' );
      const clone = value.clone();

      expect( clone ).not.toBe( value );
      expect( clone.equals( value ) ).toBe( true );
    } );

    it( 'compares DMS values', () => {
      const value = new DMS( 50, 49, 37.2, 'N' );

      expect( value.equals( new DMS( 50, 49, 37.2, 'N' ) ) ).toBe( true );
      expect( value.equals( new DMS( 50, 49, 37.2, 'S' ) ) ).toBe( false );
      expect( value.equals( new DMS( 50, 49, 37.3, 'N' ) ) ).toBe( false );
      expect( value.equals( new DMS( 50, 48, 37.2, 'N' ) ) ).toBe( false );
      expect( value.equals( new DMS( 51, 49, 37.2, 'N' ) ) ).toBe( false );
    } );
  } );
} );
