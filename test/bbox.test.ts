import { describe, expect, it } from 'vitest';
import { BBox } from '../src/bbox';
import { Coordinate } from '../src/coord';
import { Geographic2DSystem } from '../src/system';
import { Longitude } from '../src/value/Longitude';
import { Latitude } from '../src/value/Latitude';


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
} );
