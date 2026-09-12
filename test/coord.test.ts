import { describe, expect, it } from 'vitest';
import { AxisSet, LatitudeAxis, LongitudeAxis } from '../src/axis';
import { Coordinate } from '../src/coord';
import { System } from '../src/system';
import { Value } from '../src/value';


const longitude = new LongitudeAxis();
const latitude = new LatitudeAxis();
const axes = new AxisSet( { axes: [ longitude, latitude ] } );
const system = new System( { name: 'Geographic 2D', axes } );


describe( 'Coordinate', () => {
  it( 'creates an immutable coordinate', () => {
    const values = [ new Value( 12.5, longitude ), new Value( 52.5, latitude ) ];
    const coordinate = new Coordinate( { system, values } );

    expect( coordinate.system ).toBe( system );
    expect( coordinate.dimension ).toBe( 2 );
    expect( coordinate.get( 0 ) ).toBe( values[ 0 ] );
    expect( coordinate.get( 1 ) ).toBe( values[ 1 ] );

    values.reverse();

    expect( coordinate.get( 0 ) ).toBe( values[ 1 ] );
  } );

  it( 'compares coordinates', () => {
    const coordinate = Coordinate.fromTuple( [ 12.5, 52.5 ], system );

    expect( coordinate.equals( Coordinate.fromTuple( [ 12.5, 52.5 ], system.clone() ) ) ).toBe( true );
    expect( coordinate.equals( Coordinate.fromTuple( [ 13.5, 52.5 ], system ) ) ).toBe( false );
  } );

  it( 'clones system and values independently', () => {
    const coordinate = Coordinate.fromTuple( [ 12.5, 52.5 ], system );
    const clone = coordinate.clone();

    expect( clone ).not.toBe( coordinate );
    expect( clone.system ).not.toBe( system );
    expect( clone.get( 0 ) ).not.toBe( coordinate.get( 0 ) );
    expect( clone.equals( coordinate ) ).toBe( true );
  } );
} );
