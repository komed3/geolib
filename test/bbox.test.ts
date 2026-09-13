import { describe, expect, it } from 'vitest';
import { BBox } from '../src/bbox';
import { Coordinate } from '../src/coord';
import { Geographic2DSystem, Projected2DSystem } from '../src/system';


const system = new Geographic2DSystem();

const create = ( min: [ number, number ], max: [ number, number ] ) => new BBox( {
  min: Coordinate.fromTuple( min, system ), max: Coordinate.fromTuple( max, system )
} );


describe( 'BBox', () => {
  it ( 'creates a bounding box', () => {
    const bbox = create( [ -10, -20 ], [ 30, 40 ] );

    expect( bbox.min.toTuple() ).toEqual( [ -10, -20 ] );
    expect( bbox.max.toTuple() ).toEqual( [ 30, 40 ] );
    expect( bbox.system ).toBe( system );
    expect( bbox.dimension ).toBe( 2 );
  } );

  it ( 'rejects different systems', () => {
    const min = Coordinate.fromTuple( [ -10, -20 ], system );
    const max = Coordinate.fromTuple( [ 30, 40 ], new Projected2DSystem() );

    expect( () => new BBox( { min, max } ) ).toThrow( 'Bounding box system mismatch' );
  } );

  it ( 'contains coordinates inside the bounds', () => {
    const bbox = create( [ -10, -20 ], [ 30, 40 ] );

    expect( bbox.contains( Coordinate.fromTuple( [ 0, 0 ], system ) ) ).toBe( true );
  } );

  it ( 'contains coordinates on the bounds', () => {
    const bbox = create( [ -10, -20 ], [ 30, 40 ] );

    expect( bbox.contains( Coordinate.fromTuple( [ -10, -20 ], system ) ) ).toBe( true );
    expect( bbox.contains( Coordinate.fromTuple( [ 30, 40 ], system ) ) ).toBe( true );
  } );

  it ( 'rejects coordinates outside the bounds', () => {
    const bbox = create( [ -10, -20 ], [ 30, 40 ] );

    expect( bbox.contains( Coordinate.fromTuple( [ -11, 0 ], system ) ) ).toBe( false );
    expect( bbox.contains( Coordinate.fromTuple( [ 0, 41 ], system ) ) ).toBe( false );
  } );

  it ( 'rejects coordinates from another system', () => {
    const bbox = create( [ -10, -20 ], [ 30, 40 ] );
    const coordinate = Coordinate.fromTuple( [ 0, 0 ], new Projected2DSystem() );

    expect( bbox.contains( coordinate ) ).toBe( false );
  } );
} );
