import { describe, expect, it } from 'vitest';

import { Datum } from '../../src/crs/Datum';
import { Ellipsoid } from '../../src/crs/Ellipsoid';


describe( 'Datum', () => {
  const ellipsoid = new Ellipsoid( 'TEST', 6378137, 298.257223563 );
  const datum = new Datum( 'TEST', 'Test Datum', ellipsoid );

  it( 'stores its properties', () => {
    expect( datum.code ).toBe( 'TEST' );
    expect( datum.name ).toBe( 'Test Datum' );
    expect( datum.ellipsoid ).toBe( ellipsoid );
  } );

  it( 'clones a datum', () => {
    const clone = datum.clone();

    expect( clone ).not.toBe( datum );
    expect( clone.ellipsoid ).not.toBe( datum.ellipsoid );
    expect( clone.equals( datum ) ).toBe( true );
  } );

  it( 'compares datums', () => {
    expect( datum.equals( new Datum( 'TEST', 'Another Name', ellipsoid ) ) ).toBe( false );
    expect( datum.equals( new Datum( 'OTHER', 'Test Datum', ellipsoid ) ) ).toBe( false );
  } );
} );
