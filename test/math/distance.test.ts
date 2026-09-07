import { describe, expect, it } from 'vitest';

import { Coordinate } from '../../src/coordinate/Coordinate';
import { distance } from '../../src/math/distance';
import { ProjectedCoordinate } from '../../src/projection/ProjectedCoordinate';
import { GRS80, WGS84 } from '../../src/registry/ellipsoids';


describe( 'distance', () => {
  it( 'calculates a north-south distance', () => {
    const a = Coordinate.fromDegrees( 0, 0 );
    const b = Coordinate.fromDegrees( 1, 0 );

    expect( distance( a, b ) ).toBeCloseTo( 110574.388557, 3 );
  } );

  it( 'calculates an east-west distance', () => {
    const a = Coordinate.fromDegrees( 0, 0 );
    const b = Coordinate.fromDegrees( 0, 1 );

    expect( distance( a, b ) ).toBeCloseTo( 111319.490793, 3 );
  } );

  it( 'calculates the zero distance', () => {
    const coordinate = Coordinate.fromDegrees( 52.52, 13.405 );

    expect( distance( coordinate, coordinate ) ).toBe( 0 );
  } );

  it( 'is symmetric', () => {
    const a = Coordinate.fromDegrees( 52.52, 13.405 );
    const b = Coordinate.fromDegrees( 48.8566, 2.3522 );

    expect( distance( a, b ) ).toBe( distance( b, a ) );
  } );

  it( 'supports a custom ellipsoid', () => {
    const a = Coordinate.fromDegrees( 45, 0 );
    const b = Coordinate.fromDegrees( 45, 1 );

    expect( distance( a, b, { ellipsoid: WGS84 } ) ).not.toBe( distance( a, b, { ellipsoid: GRS80 } ) );
  } );

  it( 'calculates Euclidean distance for projected coordinates', () => {
    const a = new ProjectedCoordinate( 100, 200 );
    const b = new ProjectedCoordinate( 400, 600 );

    expect( distance( a, b ) ).toBe( 500 );
  } );

  it( 'rejects mixed coordinate types', () => {
    const geographic = Coordinate.fromDegrees( 52.52, 13.405 );
    const projected = new ProjectedCoordinate( 0, 0 );

    // @ts-expect-error: Passing mixed coordinate types
    expect( () => distance( geographic, projected ) ).toThrow( TypeError );
  } );

  it( 'handles a long transcontinental distance', () => {
    const a = Coordinate.fromDegrees( -41.32, 174.81 );
    const b = Coordinate.fromDegrees( 40.96, -5.50 );

    expect( distance( a, b ) ).toBeCloseTo( 19959679.267, 3 );
  } );
} );
