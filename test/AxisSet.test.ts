import { describe, expect, it } from 'vitest';

import { Axis } from '../src/axis/Axis';
import { AxisSet } from '../src/axis/AxisSet';
import { Range } from '../src/range/Range';


const unit = { name: 'degree', symbol: '°' };

const longitude = new Axis( {
  name: 'longitude', direction: 'east', unit,
  range: new Range( { min: -180, max: 180 } )
} );

const latitude = new Axis( {
  name: 'latitude', direction: 'north', unit,
  range: new Range( { min: -90, max: 90 } )
} );


describe( 'AxisSet', () => {
  it( 'creates an immutable axis collection', () => {
    const axes = new AxisSet( [ longitude, latitude ] );

    expect( axes.dimension ).toBe( 2 );
    expect( axes.get( 0 ) ).toBe( longitude );
    expect( axes.get( 1 ) ).toBe( latitude );
    expect( axes.toArray() ).toEqual( [ longitude, latitude ] );
  } );

  it( 'does not expose a mutable backing array', () => {
    const source = [ longitude, latitude ];
    const axes = new AxisSet( source );

    source.reverse();

    expect( axes.get( 0 ) ).toBe( longitude );
    expect( axes.get( 1 ) ).toBe( latitude );
  } );

  it( 'finds and checks axes by equality', () => {
    const axes = new AxisSet( [ longitude, latitude ] );

    expect( axes.indexOf( latitude ) ).toBe( 1 );
    expect( axes.indexOf( longitude.clone() ) ).toBe( 0 );
    expect( axes.indexOf( new Axis( { name: 'height', direction: 'up', unit, range: new Range() } ) ) ).toBe( -1 );
    expect( axes.has( latitude.clone() ) ).toBe( true );
  } );

  it( 'compares axis sets', () => {
    const axes = new AxisSet( [ longitude, latitude ] );

    expect( axes.equals( new AxisSet( [ longitude.clone(), latitude.clone() ] ) ) ).toBe( true );
    expect( axes.equals( new AxisSet( [ latitude, longitude ] ) ) ).toBe( false );
    expect( axes.equals( new AxisSet( [ longitude ] ) ) ).toBe( false );
  } );

  it( 'clones all axes independently', () => {
    const axes = new AxisSet( [ longitude, latitude ] );
    const clone = axes.clone();

    expect( clone ).not.toBe( axes );
    expect( clone.get( 0 ) ).not.toBe( longitude );
    expect( clone.equals( axes ) ).toBe( true );
  } );

  it( 'serializes and formats the set', () => {
    const axes = new AxisSet( [ longitude, latitude ] );

    expect( axes.toJSON() ).toEqual( [ longitude.toJSON(), latitude.toJSON() ] );
    expect( axes.toString() ).toBe( 'longitude [°], latitude [°]' );
    expect( axes.toString( { showUnit: false, delimiter: ' / ' } ) ).toBe( 'longitude / latitude' );
  } );

  it( 'iterates over its axes', () => {
    expect( [ ...new AxisSet( [ longitude, latitude ] ) ] ).toEqual( [ longitude, latitude ] );
  } );
} );
