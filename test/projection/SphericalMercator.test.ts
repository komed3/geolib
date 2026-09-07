import { describe, expect, it } from 'vitest';

import { Coordinate } from '../../src/coordinate/Coordinate';
import { SphericalMercator } from '../../src/projection/SphericalMercator';


describe( 'SphericalMercator', () => {
  const projection = new SphericalMercator();

  it( 'projects the origin', () => {
    const result = projection.project( Coordinate.fromDegrees( 0, 0 ) );

    expect( result.easting ).toBe( 0 );
    expect( result.northing ).toBeCloseTo( 0 );
  } );

  it( 'projects the Web Mercator latitude limit naturally', () => {
    const result = projection.project( Coordinate.fromDegrees( 85.0511287798066, 0 ) );

    expect( result.northing ).toBeCloseTo( 20037508.3428, 3 );
  } );

  it( 'does not clamp valid latitudes', () => {
    const coordinate = Coordinate.fromDegrees( 89, 0 );
    const result = projection.project( coordinate );
    const restored = projection.unproject( result );

    expect( restored.latitude.value ).toBeCloseTo( 89, 10 );
  } );

  it( 'rejects the poles', () => {
    expect( () => projection.project( Coordinate.fromDegrees( 90, 0 ) ) ).toThrow( RangeError );
    expect( () => projection.project( Coordinate.fromDegrees( -90, 0 ) ) ).toThrow( RangeError );
  } );

  it( 'roundtrips coordinates', () => {
    const coordinate = Coordinate.fromDegrees( 52.52, 13.405 );
    const result = projection.unproject( projection.project( coordinate ) );

    expect( result.latitude.value ).toBeCloseTo( coordinate.latitude.value, 10 );
    expect( result.longitude.value ).toBeCloseTo( coordinate.longitude.value, 10 );
  } );

  it( 'clones and compares projections', () => {
    const clone = projection.clone();

    expect( clone ).not.toBe( projection );
    expect( clone.equals( projection ) ).toBe( true );
  } );

  it( 'detects different parameters', () => {
    expect( projection.equals( new SphericalMercator( 6378138 ) ) ).toBe( false );
    expect( projection.equals( new SphericalMercator( 6378137, 10 ) ) ).toBe( false );
  } );
} );
