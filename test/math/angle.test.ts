import { describe, expect, it } from 'vitest';

import { Coordinate } from '../../src/coordinate/Coordinate';
import { angle } from '../../src/math/angle';
import { ProjectedCoordinate } from '../../src/projection/ProjectedCoordinate';


describe( 'angle', () => {
  it( 'calculates a right angle for projected coordinates', () => {
    const a = new ProjectedCoordinate( 0, 100 );
    const b = new ProjectedCoordinate( 0, 0 );
    const c = new ProjectedCoordinate( 100, 0 );

    expect( angle( a, b, c ) ).toBe( 90 );
  } );

  it( 'calculates a straight angle for projected coordinates', () => {
    const a = new ProjectedCoordinate( -100, 0 );
    const b = new ProjectedCoordinate( 0, 0 );
    const c = new ProjectedCoordinate( 100, 0 );

    expect( angle( a, b, c ) ).toBe( 180 );
  } );

  it( 'calculates a zero angle for projected coordinates', () => {
    const a = new ProjectedCoordinate( 100, 0 );
    const b = new ProjectedCoordinate( 0, 0 );
    const c = new ProjectedCoordinate( 200, 0 );

    expect( angle( a, b, c ) ).toBe( 0 );
  } );

  it( 'calculates a geographic right angle', () => {
    const a = Coordinate.fromDegrees( 1, 0 );
    const b = Coordinate.fromDegrees( 0, 0 );
    const c = Coordinate.fromDegrees( 0, 1 );

    expect( angle( a, b, c ) ).toBeCloseTo( 90, 8 );
  } );

  it( 'calculates a geographic angle', () => {
    const a = Coordinate.fromDegrees( 52.52, 13.405 );
    const b = Coordinate.fromDegrees( 50.11, 8.682 );
    const c = Coordinate.fromDegrees( 48.8566, 2.3522 );

    const result = angle( a, b, c );

    expect( result ).toBeGreaterThanOrEqual( 0 );
    expect( result ).toBeLessThanOrEqual( 180 );
  } );

  it( 'returns the smaller angle between geodesics', () => {
    const a = Coordinate.fromDegrees( 1, 0 );
    const b = Coordinate.fromDegrees( 0, 0 );
    const c = Coordinate.fromDegrees( -1, 0 );

    expect( angle( a, b, c ) ).toBeCloseTo( 180, 8 );
  } );

  it( 'rejects mixed coordinate types', () => {
    const a = Coordinate.fromDegrees( 1, 0 );
    const b = Coordinate.fromDegrees( 0, 0 );
    const c = new ProjectedCoordinate( 0, 0 );

    // @ts-expect-error: Passing mixed coordinate types
    expect( () => angle( a, b, c ) ).toThrow( TypeError );
  } );

  it( 'rejects undefined projected angles', () => {
    const a = new ProjectedCoordinate( 0, 0 );
    const b = new ProjectedCoordinate( 0, 0 );
    const c = new ProjectedCoordinate( 100, 0 );

    expect( () => angle( a, b, c ) ).toThrow( RangeError );
  } );
} );
