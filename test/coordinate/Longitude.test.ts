import { describe, expect, it } from 'vitest';

import { Longitude } from '../../src/coordinate/Longitude';


describe( 'Longitude', () => {
  it( 'accepts valid values', () => {
    expect( new Longitude( 0 ).value ).toBe( 0 );
    expect( new Longitude( 180 ).value ).toBe( 180 );
    expect( new Longitude( -180 ).value ).toBe( -180 );
  } );

  it( 'rejects non-finite values', () => {
    expect( () => new Longitude( NaN ) ).toThrow( TypeError );
    expect( () => new Longitude( Infinity ) ).toThrow( TypeError );
    expect( () => new Longitude( -Infinity ) ).toThrow( TypeError );
  } );

  it( 'rejects values outside the valid range', () => {
    expect( () => new Longitude( 180.0001 ) ).toThrow( RangeError );
    expect( () => new Longitude( -180.0001 ) ).toThrow( RangeError );
  } );
} );
