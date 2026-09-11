import { describe, expect, it } from 'vitest';

import { Range } from '../src/range';


describe( 'Range', () => {
  it( 'creates an inclusive range by default', () => {
    const range = new Range( { min: 10, max: 20 } );

    expect( range.min ).toBe( 10 );
    expect( range.max ).toBe( 20 );
    expect( range.minInclusive ).toBe( true );
    expect( range.maxInclusive ).toBe( true );
  } );

  it( 'supports open boundaries', () => {
    const range = new Range( { min: 10, max: 20, minInclusive: false, maxInclusive: false } );

    expect( range.contains( 10 ) ).toBe( false );
    expect( range.contains( 10.1 ) ).toBe( true );
    expect( range.contains( 20 ) ).toBe( false );
    expect( range.contains( 19.9 ) ).toBe( true );
  } );

  it( 'supports unbounded ranges', () => {
    expect( new Range().contains( -Infinity ) ).toBe( true );
    expect( new Range( { min: 10 } ).contains( 100 ) ).toBe( true );
    expect( new Range( { max: 10 } ).contains( -100 ) ).toBe( true );
  } );
} );
