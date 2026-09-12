import { describe, expect, it } from 'vitest';
import { AxisSet, HeightAxis, LatitudeAxis, LongitudeAxis } from '../src/axis';
import { System } from '../src/system';


const longitude = new LongitudeAxis();
const latitude = new LatitudeAxis();
const axes = new AxisSet( { axes: [ longitude, latitude ] } );
const system = new System( { name: 'Geographic 2D', axes } );


describe( 'System', () => {
  it( 'creates a system and exposes its dimension', () => {
    expect( system.name ).toBe( 'Geographic 2D' );
    expect( system.axes ).toBe( axes );
    expect( system.dimension ).toBe( 2 );
  } );

  it( 'accesses and finds axes', () => {
    expect( system.get( 0 ) ).toBe( longitude );
    expect( system.get( 1 ) ).toBe( latitude );
    expect( system.indexOf( latitude.clone() ) ).toBe( 1 );
    expect( system.indexOf( new HeightAxis() ) ).toBe( -1 );
  } );
} );
