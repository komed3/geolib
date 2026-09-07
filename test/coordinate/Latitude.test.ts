import { describe, expect, it } from 'vitest';

import { Latitude } from '../../src/coordinate/Latitude';


describe( 'Latitude', () => {
  it( 'accepts valid values', () => {
    expect( new Latitude( 0 ).value ).toBe( 0 );
    expect( new Latitude( 90 ).value ).toBe( 90 );
    expect( new Latitude( -90 ).value ).toBe( -90 );
  } );

  it( 'rejects non-finite values', () => {
    expect( () => new Latitude( NaN ) ).toThrow( TypeError );
    expect( () => new Latitude( Infinity ) ).toThrow( TypeError );
    expect( () => new Latitude( -Infinity ) ).toThrow( TypeError );
  } );

  it( 'rejects values outside the valid range', () => {
    expect( () => new Latitude( 90.0001 ) ).toThrow( RangeError );
    expect( () => new Latitude( -90.0001 ) ).toThrow( RangeError );
  } );
} );
