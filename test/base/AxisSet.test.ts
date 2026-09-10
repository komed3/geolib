import { describe, expect, it } from 'vitest';
import { Axis } from '../../src/base/Axis';
import { AxisSet } from '../../src/base/AxisSet';
import { Range } from '../../src/base/Range';


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
} );
