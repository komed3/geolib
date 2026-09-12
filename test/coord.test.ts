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
} );
