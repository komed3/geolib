import { describe, expect, it } from 'vitest';

import { Ellipsoid } from '../../src/crs/Ellipsoid';


describe( 'Ellipsoid', () => {
  const ellipsoid = new Ellipsoid( 'TEST', 6378137, 298.257223563 );

  it( 'stores its properties', () => {
    expect( ellipsoid.code ).toBe( 'TEST' );
    expect( ellipsoid.semiMajorAxis ).toBe( 6378137 );
    expect( ellipsoid.inverseFlattening ).toBe( 298.257223563 );
  } );

  it( 'rejects an invalid semi-major axis', () => {
    expect( () => new Ellipsoid( 'TEST', 0, 298.257223563 ) ).toThrow( RangeError );
    expect( () => new Ellipsoid( 'TEST', -1, 298.257223563 ) ).toThrow( RangeError );
    expect( () => new Ellipsoid( 'TEST', NaN, 298.257223563 ) ).toThrow( RangeError );
    expect( () => new Ellipsoid( 'TEST', Infinity, 298.257223563 ) ).toThrow( RangeError );
  } );

  it( 'rejects an invalid inverse flattening', () => {
    expect( () => new Ellipsoid( 'TEST', 6378137, 0 ) ).toThrow( RangeError );
    expect( () => new Ellipsoid( 'TEST', 6378137, -1 ) ).toThrow( RangeError );
    expect( () => new Ellipsoid( 'TEST', 6378137, NaN ) ).toThrow( RangeError );
    expect( () => new Ellipsoid( 'TEST', 6378137, Infinity ) ).toThrow( RangeError );
  } );

  it( 'calculates flattening', () => {
    expect( ellipsoid.flattening ).toBeCloseTo( 1 / 298.257223563 );
  } );

  it( 'calculates the semi-minor axis', () => {
    expect( ellipsoid.semiMinorAxis ).toBeCloseTo( 6356752.314245179 );
  } );

  it( 'calculates the first eccentricity squared', () => {
    expect( ellipsoid.firstEccentricitySquared ).toBeCloseTo( 0.0066943799901413165 );
  } );

  it( 'calculates the first eccentricity', () => {
    expect( ellipsoid.firstEccentricity ).toBeCloseTo( 0.08181919084262149 );
  } );

  it( 'calculates the second eccentricity squared', () => {
    expect( ellipsoid.secondEccentricitySquared ).toBeCloseTo( 0.006739496742276434 );
  } );

  it( 'calculates the second eccentricity', () => {
    expect( ellipsoid.secondEccentricity ).toBeCloseTo( 0.08209443794969568 );
  } );

  it( 'clones an ellipsoid', () => {
    const clone = ellipsoid.clone();

    expect( clone ).not.toBe( ellipsoid );
    expect( clone.equals( ellipsoid ) ).toBe( true );
  } );

  it( 'compares ellipsoids', () => {
    expect( ellipsoid.equals( new Ellipsoid( 'TEST', 6378137, 298.257223563 ) ) ).toBe( true );
    expect( ellipsoid.equals( new Ellipsoid( 'OTHER', 6378137, 298.257223563 ) ) ).toBe( false );
    expect( ellipsoid.equals( new Ellipsoid( 'TEST', 6378138, 298.257223563 ) ) ).toBe( false );
    expect( ellipsoid.equals( new Ellipsoid( 'TEST', 6378137, 298.257 ) ) ).toBe( false );
  } );
} );
