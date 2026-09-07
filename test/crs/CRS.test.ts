import { describe, expect, it } from 'vitest';

import { CRS } from '../../src/crs/CRS';
import { CoordinateSystem } from '../../src/crs/CoordinateSystem';
import { Datum } from '../../src/crs/Datum';
import { Ellipsoid } from '../../src/crs/Ellipsoid';


describe( 'CRS', () => {
  const ellipsoid = new Ellipsoid( 'TEST', 6378137, 298.257223563 );
  const datum = new Datum( 'TEST', 'Test Datum', ellipsoid );

  const projection = {
    name: 'TEST', clone: () => projection, equals: () => true,
    project: () => { throw new Error( 'Not implemented' ) },
    unproject: () => { throw new Error( 'Not implemented' ) }
  };

  const geographic = new CoordinateSystem( 'ellipsoidal', [
    { name: 'Geodetic latitude', direction: 'north', unit: 'degree' },
    { name: 'Geodetic longitude', direction: 'east', unit: 'degree' }
  ] );

  const projected = new CoordinateSystem( 'cartesian', [
    { name: 'Easting', direction: 'east', unit: 'metre' },
    { name: 'Northing', direction: 'north', unit: 'metre' }
  ] );

  it( 'stores its properties', () => {
    const crs = new CRS( 'TEST:4326', 'Test CRS', 'geographic', datum, geographic );

    expect( crs.code ).toBe( 'TEST:4326' );
    expect( crs.name ).toBe( 'Test CRS' );
    expect( crs.type ).toBe( 'geographic' );
    expect( crs.datum ).toBe( datum );
    expect( crs.coordinateSystem ).toBe( geographic );
    expect( crs.projection ).toBeUndefined();
  } );

  it( 'accepts a projection for projected CRS', () => {
    const crs = new CRS( 'TEST:3857', 'Test Projected CRS', 'projected', datum, projected, projection );

    expect( crs.projection ).toBe( projection );
  } );

  it( 'rejects a projection on geographic CRS', () => {
    expect( () => new CRS( 'TEST:4326', 'Test CRS', 'geographic', datum, geographic, projection ) ).toThrow( TypeError );
  } );

  it( 'rejects a projected CRS without a projection', () => {
    expect( () => new CRS( 'TEST:3857', 'Test Projected CRS', 'projected', datum, projected ) ).toThrow( TypeError );
  } );

  it( 'clones a geographic CRS', () => {
    const crs = new CRS( 'TEST:4326', 'Test CRS', 'geographic', datum, geographic );
    const clone = crs.clone();

    expect( clone ).not.toBe( crs );
    expect( clone.datum ).not.toBe( crs.datum );
    expect( clone.coordinateSystem ).not.toBe( crs.coordinateSystem );
    expect( clone.equals( crs ) ).toBe( true );
  } );

  it( 'compares CRS by code', () => {
    const crs = new CRS( 'TEST:4326', 'Test CRS', 'geographic', datum, geographic );

    expect( crs.equals( new CRS( 'TEST:4326', 'Another Name', 'geographic', datum, geographic ) ) ).toBe( false );
    expect( crs.equals( new CRS( 'TEST:3857', 'Test CRS', 'projected', datum, projected, projection ) ) ).toBe( false );
  } );

  it( 'detects geographic CRS', () => {
    const crs = new CRS( 'TEST:4326', 'Test CRS', 'geographic', datum, geographic );

    expect( crs.isGeographic() ).toBe( true );
    expect( crs.isProjected() ).toBe( false );
    expect( crs.hasProjection() ).toBe( false );
  } );

  it( 'detects projected CRS', () => {
    const crs = new CRS( 'TEST:3857', 'Test Projected CRS', 'projected', datum, projected, projection );

    expect( crs.isGeographic() ).toBe( false );
    expect( crs.isProjected() ).toBe( true );
    expect( crs.hasProjection() ).toBe( true );
  } );
} );
