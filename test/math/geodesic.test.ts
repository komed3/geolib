import { describe, expect, it } from 'vitest';

import { Coordinate } from '../../src/coordinate/Coordinate';
import { geodesic } from '../../src/math/geodesic';


describe( 'geodesic', () => {
  it( 'returns zero for identical coordinates', () => {
    const coordinate = Coordinate.fromDegrees( 52.52, 13.405 );
    const result = geodesic( coordinate, coordinate );

    expect( result.distance ).toBe( 0 );
    expect( result.initialBearing ).toBe( 0 );
    expect( result.finalBearing ).toBe( 0 );
  } );

  it( 'calculates one degree of longitude at the equator', () => {
    const a = Coordinate.fromDegrees( 0, 0 );
    const b = Coordinate.fromDegrees( 0, 1 );
    const result = geodesic( a, b );

    expect( result.distance ).toBeCloseTo( 111319.490793, 3 );
    expect( result.initialBearing ).toBeCloseTo( 90, 10 );
  } );

  it( 'calculates one degree of latitude', () => {
    const a = Coordinate.fromDegrees( 0, 0 );
    const b = Coordinate.fromDegrees( 1, 0 );
    const result = geodesic( a, b );

    expect( result.distance ).toBeCloseTo( 110574.388557, 3 );
    expect( result.initialBearing ).toBeCloseTo( 0, 10 );
  } );

  it( 'handles a long geodesic', () => {
    const a = Coordinate.fromDegrees( -41.32, 174.81 );
    const b = Coordinate.fromDegrees( 40.96, -5.50 );
    const result = geodesic( a, b );

    expect( result.distance ).toBeCloseTo( 19959679.267, 3 );
  } );

  it( 'keeps bearings normalized', () => {
    const a = Coordinate.fromDegrees( 52.52, 13.405 );
    const b = Coordinate.fromDegrees( 48.8566, 2.3522 );
    const result = geodesic( a, b );

    expect( result.initialBearing ).toBeGreaterThanOrEqual( 0 );
    expect( result.initialBearing ).toBeLessThan( 360 );
    expect( result.finalBearing ).toBeGreaterThanOrEqual( 0 );
    expect( result.finalBearing ).toBeLessThan( 360 );
  } );

  it( 'handles nearly antipodal points without returning non-finite values', () => {
    const a = Coordinate.fromDegrees( 10, 20 );
    const b = Coordinate.fromDegrees( -10, -159.999 );
    const result = geodesic( a, b );

    expect( Number.isFinite( result.distance ) ).toBe( true );
    expect( Number.isFinite( result.initialBearing ) ).toBe( true );
    expect( Number.isFinite( result.finalBearing ) ).toBe( true );
  } );
} );
