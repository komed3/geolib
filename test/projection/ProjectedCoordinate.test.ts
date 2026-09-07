import { describe, expect, it } from 'vitest';

import { ProjectedCoordinate } from '../../src/projection/ProjectedCoordinate';


describe( 'ProjectedCoordinate', () => {
  it( 'creates a coordinate', () => {
    const coordinate = new ProjectedCoordinate( 500000, 4649776.225 );

    expect( coordinate.easting ).toBe( 500000 );
    expect( coordinate.northing ).toBe( 4649776.225 );
  } );

  it( 'creates a coordinate from a tuple', () => {
    const coordinate = ProjectedCoordinate.fromTuple( [ 500000, 4649776.225 ] );

    expect( coordinate.toTuple() ).toEqual( [ 500000, 4649776.225 ] );
  } );

  it( 'clones a coordinate', () => {
    const coordinate = new ProjectedCoordinate( 500000, 4649776.225 );
    const clone = coordinate.clone();

    expect( clone ).not.toBe( coordinate );
    expect( clone.equals( coordinate ) ).toBe( true );
  } );

  it( 'compares coordinates', () => {
    const coordinate = new ProjectedCoordinate( 500000, 4649776.225 );

    expect( coordinate.equals( new ProjectedCoordinate( 500000, 4649776.225 ) ) ).toBe( true );
    expect( coordinate.equals( new ProjectedCoordinate( 500001, 4649776.225 ) ) ).toBe( false );
  } );
} );
