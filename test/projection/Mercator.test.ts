import { describe, expect, it } from 'vitest';

import { Coordinate } from '../../src/coordinate/Coordinate';
import { Mercator } from '../../src/projection/Mercator';
import { ProjectedCoordinate } from '../../src/projection/ProjectedCoordinate';
import { WGS84 } from '../../src/registry/ellipsoids';


describe( 'Mercator', () => {
  const projection = new Mercator( WGS84 );

  it( 'projects the equator', () => {
    const result = projection.project( Coordinate.fromDegrees( 0, 0 ) );

    expect( result.easting ).toBe( 0 );
    expect( result.northing ).toBeCloseTo( 0, 7 );
  } );

  it( 'projects a known WGS 84 / World Mercator coordinate', () => {
    const result = projection.project( Coordinate.fromDegrees( 2, 0 ) );

    expect( result.easting ).toBe( 0 );
    expect( result.northing ).toBeCloseTo( 221194.0772, 4 );
  } );

  it( 'unprojects a known coordinate', () => {
    const result = projection.unproject( new ProjectedCoordinate( 0, 221194.07716771573 ) );

    expect( result.latitude.value ).toBeCloseTo( 2, 10 );
    expect( result.longitude.value ).toBeCloseTo( 0, 10 );
  } );

  it( 'roundtrips coordinates', () => {
    const coordinate = Coordinate.fromDegrees( 52.52, 13.405 );
    const result = projection.unproject( projection.project( coordinate ) );

    expect( result.latitude.value ).toBeCloseTo( coordinate.latitude.value, 10 );
    expect( result.longitude.value ).toBeCloseTo( coordinate.longitude.value, 10 );
  } );

  it( 'rejects the poles', () => {
    expect( () => projection.project( Coordinate.fromDegrees( 90, 0 ) ) ).toThrow( RangeError );
    expect( () => projection.project( Coordinate.fromDegrees( -90, 0 ) ) ).toThrow( RangeError );
  } );

  it( 'clones and compares projections', () => {
    const clone = projection.clone();

    expect( clone ).not.toBe( projection );
    expect( clone.equals( projection ) ).toBe( true );
  } );

  it( 'detects different parameters', () => {
    expect( projection.equals( new Mercator( WGS84, 10 ) ) ).toBe( false );
    expect( projection.equals( new Mercator( WGS84, 0, 0.9996 ) ) ).toBe( false );
  } );
} );
