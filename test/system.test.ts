import { describe, expect, it } from 'vitest';
import { Axis, AxisSet } from '../src/axis';
import { Range } from '../src/range';
import { System } from '../src/system';
import { Degree } from '../src/unit';


const longitude = new Axis( {
  name: 'longitude', orientation: 'east', unit: new Degree(),
  range: new Range( { min: -180, max: 180 } )
} );

const latitude = new Axis( {
  name: 'latitude', orientation: 'north', unit: new Degree(),
  range: new Range( { min: -90, max: 90 } )
} );

const axes = new AxisSet( { axes: [ longitude, latitude ] } );
const system = new System( { name: 'Geographic 2D', axes } );


describe( 'System', () => {
  it( 'creates a system and exposes its dimension', () => {
    expect( system.name ).toBe( 'Geographic 2D' );
    expect( system.axes ).toBe( axes );
    expect( system.dimension ).toBe( 2 );
  } );
} );
