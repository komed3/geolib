import { describe, expect, it } from 'vitest';
import { Range } from '../../src/base/Range';


describe( 'Range', () => {
  it( 'creates an inclusive range by default', () => {
    const range = new Range( { min: 10, max: 20 } );

    expect( range.min ).toBe( 10 );
    expect( range.max ).toBe( 20 );
    expect( range.minInclusive ).toBe( true );
    expect( range.maxInclusive ).toBe( true );
  } );
} );
