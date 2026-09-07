import { describe, expect, it } from 'vitest';

import { Coordinate } from '../../src/coordinate/Coordinate';
import { bearing } from '../../src/math/bearing';


describe( 'bearing', () => {
  it( 'calculates north', () => {
    const a = Coordinate.fromDegrees( 0, 0 );
    const b = Coordinate.fromDegrees( 1, 0 );

    expect( bearing( a, b ) ).toBeCloseTo( 0, 10 );
  } );

  it( 'calculates east', () => {
    const a = Coordinate.fromDegrees( 0, 0 );
    const b = Coordinate.fromDegrees( 0, 1 );

    expect( bearing( a, b ) ).toBeCloseTo( 90, 10 );
  } );

  it( 'calculates south', () => {
    const a = Coordinate.fromDegrees( 1, 0 );
    const b = Coordinate.fromDegrees( 0, 0 );

    expect( bearing( a, b ) ).toBeCloseTo( 180, 10 );
  } );

  it( 'calculates west', () => {
    const a = Coordinate.fromDegrees( 0, 1 );
    const b = Coordinate.fromDegrees( 0, 0 );

    expect( bearing( a, b ) ).toBeCloseTo( 270, 10 );
  } );

  it( 'handles longitude wrapping', () => {
    const a = Coordinate.fromDegrees( 0, 179 );
    const b = Coordinate.fromDegrees( 0, -179 );

    expect( bearing( a, b ) ).toBeCloseTo( 90, 10 );
  } );

  it( 'returns a normalized bearing', () => {
    const a = Coordinate.fromDegrees( 52.52, 13.405 );
    const b = Coordinate.fromDegrees( 48.8566, 2.3522 );
    const result = bearing( a, b );

    expect( result ).toBeGreaterThanOrEqual( 0 );
    expect( result ).toBeLessThan( 360 );
  } );

  it( 'calculates a real geodesic bearing', () => {
    const a = Coordinate.fromDegrees( 52.52, 13.405 );
    const b = Coordinate.fromDegrees( 48.8566, 2.3522 );

    expect( bearing( a, b ) ).toBeCloseTo( 246.8, 0 );
  } );
} );
