import { describe, expect, it } from 'vitest';
import { BBox, Geographic2DBBox } from '../src/bbox';
import { Coordinate, Geographic2DCoordinate } from '../src/coord';
import { Geographic2DSystem, Projected2DSystem } from '../src/system';
import { Latitude, Longitude } from '../src/value';


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

  it ( 'intersects overlapping bounding boxes', () => {
    const bbox = create( [ -10, -20 ], [ 30, 40 ] );
    const other = create( [ 0, 10 ], [ 50, 50 ] );
    const intersection = bbox.intersect( other );

    expect( intersection ).not.toBeNull();
    expect( intersection?.toTuple() ).toEqual( [ [ 0, 10 ], [ 30, 40 ] ] );
  } );

  it ( 'intersects touching bounding boxes', () => {
    const bbox = create( [ -10, -20 ], [ 30, 40 ] );
    const other = create( [ 30, 40 ], [ 50, 60 ] );
    const intersection = bbox.intersect( other );

    expect( intersection ).not.toBeNull();
    expect( intersection?.toTuple() ).toEqual( [ [ 30, 40 ], [ 30, 40 ] ] );
  } );

  it ( 'returns null for non-intersecting bounding boxes', () => {
    const bbox = create( [ -10, -20 ], [ 30, 40 ] );
    const other = create( [ 31, 41 ], [ 50, 60 ] );

    expect( bbox.intersect( other ) ).toBeNull();
  } );

  it ( 'returns null for different systems', () => {
    const bbox = create( [ -10, -20 ], [ 30, 40 ] );

    const other = new BBox( {
      min: Coordinate.fromTuple( [ -10, -20 ], new Projected2DSystem() ),
      max: Coordinate.fromTuple( [ 30, 40 ], new Projected2DSystem() )
    } );

    expect( bbox.intersect( other ) ).toBeNull();
  } );

  it ( 'preserves the coordinate type when intersecting', () => {
    const bbox = new BBox( {
      min: new Geographic2DCoordinate( new Longitude( -10 ), new Latitude( -20 ) ),
      max: new Geographic2DCoordinate( new Longitude( 30 ), new Latitude( 40 ) )
    } );

    const other = new BBox( {
      min: new Geographic2DCoordinate( new Longitude( 0 ), new Latitude( 10 ) ),
      max: new Geographic2DCoordinate( new Longitude( 50 ), new Latitude( 50 ) )
    } );

    const intersection = bbox.intersect( other );

    expect( intersection?.min ).toBeInstanceOf( Geographic2DCoordinate );
    expect( intersection?.max ).toBeInstanceOf( Geographic2DCoordinate );
    expect( intersection?.toTuple() ).toEqual( [ [ 0, 10 ], [ 30, 40 ] ] );
  } );

  it ( 'compares equal bounding boxes', () => {
    const bbox = create( [ -10, -20 ], [ 30, 40 ] );
    const other = create( [ -10, -20 ], [ 30, 40 ] );

    expect( bbox.equals( other ) ).toBe( true );
  } );

  it ( 'rejects different bounding boxes', () => {
    const bbox = create( [ -10, -20 ], [ 30, 40 ] );
    const other = create( [ -10, -20 ], [ 30, 41 ] );

    expect( bbox.equals( other ) ).toBe( false );
  } );

  it ( 'clones a bounding box', () => {
    const bbox = create( [ -10, -20 ], [ 30, 40 ] );
    const clone = bbox.clone();

    expect( clone ).not.toBe( bbox );
    expect( clone.min ).not.toBe( bbox.min );
    expect( clone.max ).not.toBe( bbox.max );
    expect( clone.equals( bbox ) ).toBe( true );
  } );

  it ( 'converts to a tuple', () => {
    expect( create( [ -10, -20 ], [ 30, 40 ] ).toTuple() ).toEqual( [ [ -10, -20 ], [ 30, 40 ] ] );
  } );

  it ( 'creates a bounding box from a tuple', () => {
    expect( BBox.fromTuple( [ [ -10, -20 ], [ 30, 40 ] ], system ).toTuple() )
      .toEqual( [ [ -10, -20 ], [ 30, 40 ] ] );
  } );

  it ( 'converts to JSON', () => {
    expect( create( [ -10, -20 ], [ 30, 40 ] ).toJSON() )
      .toEqual( { min: [ -10, -20 ], max: [ 30, 40 ], system: system.name } );
  } );

  it ( 'converts to a string', () => {
    expect( create( [ -10, -20 ], [ 30, 40 ] ).toString() ).toBe( '[-10°, -20°] – [30°, 40°]' );
  } );

  it ( 'supports a custom string format', () => {
    expect( create( [ -10, -20 ], [ 30, 40 ] ).toString( { format: '{min} / {max}' } ) )
      .toBe( '-10°, -20° / 30°, 40°' );
  } );

  it ( 'creates a geographic 2D bounding box', () => {
    const bbox = Geographic2DBBox.fromTuple( [ [ -180, -90 ], [ 180, 90 ] ] );

    expect( bbox ).toBeInstanceOf( Geographic2DBBox );
    expect( bbox.min ).toBeInstanceOf( Geographic2DCoordinate );
    expect( bbox.max ).toBeInstanceOf( Geographic2DCoordinate );
    expect( bbox.dimension ).toBe( 2 );
    expect( bbox.toTuple() ).toEqual( [ [ -180, -90 ], [ 180, 90 ] ] );
  } );
} );
