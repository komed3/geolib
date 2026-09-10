import { describe, expect, it } from 'vitest';

import { Axis } from '../../src/core/Axis';
import { AxisSet } from '../../src/core/AxisSet';
import { Range } from '../../src/core/Range';
import { System } from '../../src/core/System';


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

  it( 'accesses and finds axes', () => {
    const system = new System( 'WGS84', axes );

    expect( system.get( 0 ) ).toBe( longitude );
    expect( system.get( 1 ) ).toBe( latitude );
    expect( system.indexOf( latitude.clone() ) ).toBe( 1 );
    expect( system.indexOf( new Axis( { name: 'height', direction: 'up', unit, range: new Range() } ) ) ).toBe( -1 );
  } );

  it( 'compares systems', () => {
    const system = new System( 'WGS84', axes );

    expect( system.equals( new System( 'WGS84', axes.clone() ) ) ).toBe( true );
    expect( system.equals( new System( 'ETRS89', axes ) ) ).toBe( false );
    expect( system.equals( new System( 'WGS84', new AxisSet( [ latitude, longitude ] ) ) ) ).toBe( false );
  } );

  it( 'clones independently', () => {
    const system = new System( 'WGS84', axes );
    const clone = system.clone();

    expect( clone ).not.toBe( system );
    expect( clone.axes ).not.toBe( axes );
    expect( clone.get( 0 ) ).not.toBe( longitude );
    expect( clone.equals( system ) ).toBe( true );
  } );

  it( 'serializes to JSON', () => {
    expect( new System( 'WGS84', axes ).toJSON() ).toEqual( { name: 'WGS84', axes: axes.toJSON() } );
  } );

  it( 'formats the system', () => {
    const system = new System( 'WGS84', axes );

    expect( system.toString() ).toBe( 'WGS84 (longitude [°], latitude [°])' );
    expect( system.toString( { showUnit: false, delimiter: ' / ' } ) ).toBe( 'WGS84 (longitude / latitude)' );
  } );
} );
