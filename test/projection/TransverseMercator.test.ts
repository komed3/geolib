import { describe, expect, it } from 'vitest';

import { Coordinate } from '../../src/coordinate/Coordinate';
import { Ellipsoid } from '../../src/crs/Ellipsoid';
import { TransverseMercator } from '../../src/projection/TransverseMercator';


describe( 'TransverseMercator', () => {
  const ellipsoid = new Ellipsoid( 'WGS84', 6378137, 298.257223563 );
  const projection = new TransverseMercator( ellipsoid, 9, 0, 0.9996, 500000, 0 );

  it( 'projects the natural origin', () => {
    const result = projection.project( Coordinate.fromDegrees( 0, 9 ) );

    expect( result.easting ).toBeCloseTo( 500000, 8 );
    expect( result.northing ).toBeCloseTo( 0, 8 );
  } );

  it( 'matches the EPSG UTM 32N reference value', () => {
    const result = projection.project( Coordinate.fromDegrees( 42, 9 ) );

    expect( result.easting ).toBeCloseTo( 500000, 3 );
    expect( result.northing ).toBeCloseTo( 4649776.225, 3 );
  } );

  it( 'matches the EPSG Transverse Mercator example', () => {
    const tmProjection = new TransverseMercator(
      new Ellipsoid( 'EPSG:7008', 6377563.396, 299.32496 ),
      -2, 49, 0.9996013, 400000, -100000
    );

    const result = tmProjection.project( Coordinate.fromDegrees( 50.5, 0.5 ) );

    expect( result.easting ).toBeCloseTo( 577274.99, 2 );
    expect( result.northing ).toBeCloseTo( 69740.50, 2 );
  } );

  it( 'roundtrips coordinates', () => {
    const coordinate = Coordinate.fromDegrees( 52.52, 10.405 );
    const result = projection.unproject( projection.project( coordinate ) );

    expect( result.latitude.value ).toBeCloseTo( coordinate.latitude.value, 7 );
    expect( result.longitude.value ).toBeCloseTo( coordinate.longitude.value, 7 );
  } );

  it( 'rejects the poles', () => {
    const tmProjection = new TransverseMercator( ellipsoid, 9 );

    expect( () => tmProjection.project( Coordinate.fromDegrees( 90, 9 ) ) ).toThrow( RangeError );
    expect( () => tmProjection.project( Coordinate.fromDegrees( -90, 9 ) ) ).toThrow( RangeError );
  } );

  it( 'clones and compares projections', () => {
    const clone = projection.clone();

    expect( clone ).not.toBe( projection );
    expect( clone.equals( projection ) ).toBe( true );
  } );

  it( 'detects different parameters', () => {
    const tmProjection = new TransverseMercator( ellipsoid, 9 );

    expect( tmProjection.equals( new TransverseMercator( ellipsoid, 10 ) ) ).toBe( false );
    expect( tmProjection.equals( new TransverseMercator( ellipsoid, 9, 1 ) ) ).toBe( false );
  } );
} );
