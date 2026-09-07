import { describe, expect, it } from 'vitest';

import { CoordinateSystem } from '../../src/crs/CoordinateSystem';


describe( 'CoordinateSystem', () => {
  const axes = [
    { name: 'Geodetic latitude', direction: 'north' as const, unit: 'degree' as const },
    { name: 'Geodetic longitude', direction: 'east' as const, unit: 'degree' as const }
  ];

  const system = new CoordinateSystem( 'ellipsoidal', axes );

  it( 'stores its type and axes', () => {
    expect( system.type ).toBe( 'ellipsoidal' );
    expect( system.axes ).toEqual( axes );
  } );

  it( 'calculates its dimension', () => {
    expect( system.dimension ).toBe( 2 );
  } );

  it( 'detects ellipsoidal systems', () => {
    expect( system.isEllipsoidal() ).toBe( true );
    expect( system.isCartesian() ).toBe( false );
  } );

  it( 'detects cartesian systems', () => {
    const cartesian = new CoordinateSystem( 'cartesian', [
      { name: 'Easting', direction: 'east', unit: 'metre' },
      { name: 'Northing', direction: 'north', unit: 'metre' }
    ] );

    expect( cartesian.isCartesian() ).toBe( true );
    expect( cartesian.isEllipsoidal() ).toBe( false );
  } );

  it( 'clones a coordinate system', () => {
    const clone = system.clone();

    expect( clone ).not.toBe( system );
    expect( clone.axes ).not.toBe( system.axes );
    expect( clone.axes[ 0 ] ).not.toBe( system.axes[ 0 ] );
    expect( clone.equals( system ) ).toBe( true );
  } );

  it( 'compares coordinate systems', () => {
    expect( system.equals( new CoordinateSystem( 'ellipsoidal', axes ) ) ).toBe( true );
    expect( system.equals( new CoordinateSystem( 'cartesian', axes ) ) ).toBe( false );
    expect( system.equals( new CoordinateSystem( 'ellipsoidal', [ axes[ 1 ], axes[ 0 ] ] ) ) ).toBe( false );

    expect( system.equals( new CoordinateSystem( 'ellipsoidal', [
      { name: 'Latitude', direction: 'north', unit: 'degree' }, axes[ 1 ]
    ] ) ) ).toBe( false );

    expect( system.equals( new CoordinateSystem( 'ellipsoidal', [
      { name: axes[ 0 ].name, direction: 'south', unit: 'degree' }, axes[ 1 ]
    ] ) ) ).toBe( false );

    expect( system.equals( new CoordinateSystem( 'ellipsoidal', [
      { name: axes[ 0 ].name, direction: 'north', unit: 'metre' }, axes[ 1 ]
    ] ) ) ).toBe( false );
  } );

  it( 'supports an empty axis list', () => {
    const empty = new CoordinateSystem( 'ellipsoidal', [] );

    expect( empty.dimension ).toBe( 0 );
    expect( empty.axes ).toEqual( [] );
  } );
} );
