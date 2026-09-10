import { describe, expect, it } from 'vitest';
import { Axis } from '../../src/base/Axis';
import { AxisSet } from '../../src/base/AxisSet';
import { Range } from '../../src/base/Range';
import { System } from '../../src/base/System';


const unit = { name: 'degree', symbol: '°' };
const longitude = new Axis( { name: 'longitude', direction: 'east', unit, range: new Range( { min: -180, max: 180 } ) } );
const latitude = new Axis( { name: 'latitude', direction: 'north', unit, range: new Range( { min: -90, max: 90 } ) } );
const axes = new AxisSet( [ longitude, latitude ] );


describe( 'System', () => {
  it( 'creates a system and exposes its dimension', () => {
    const system = new System( 'WGS84', axes );

    expect( system.name ).toBe( 'WGS84' );
    expect( system.axes ).toBe( axes );
    expect( system.dimension ).toBe( 2 );
  } );
} );
