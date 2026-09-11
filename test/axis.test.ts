import { describe, expect, it } from 'vitest';
import { Axis, AxisSet, LatitudeAxis, LongitudeAxis } from '../src/axis';
import { Range } from '../src/range';
import { Unit } from '../src/unit';


const latitude = new LatitudeAxis(), longitude = new LongitudeAxis();
const axes = new AxisSet( { axes: [ longitude, latitude ] } );
const unit = new Unit( { name: 'metre', unit: 'm', quantity: 'length' } );
const range = new Range( { min: -180, max: 180 } );

const createAxis = ( behavior?: 'none' | 'clamp' | 'wrap' ) => new Axis( {
  name: 'longitude', orientation: 'east', unit, range, behavior
} );


describe( 'Axis', () => {
  it( 'creates an axis with default behavior', () => {
    const axis = createAxis();

    expect( axis.name ).toBe( 'longitude' );
    expect( axis.orientation ).toBe( 'east' );
    expect( axis.unit ).toBe( unit );
    expect( axis.range ).toBe( range );
    expect( axis.behavior ).toBe( 'none' );
  } );
} );

describe( 'AxisSet', () => {
  it( 'creates an immutable axis collection', () => {
    expect( axes.dimension ).toBe( 2 );
    expect( axes.get( 0 ) ).toBe( longitude );
    expect( axes.get( 1 ) ).toBe( latitude );
    expect( axes.toArray() ).toEqual( [ longitude, latitude ] );
  } );

  it( 'finds and checks axes by equality', () => {
    expect( axes.indexOf( latitude ) ).toBe( 1 );
    expect( axes.indexOf( longitude.clone() ) ).toBe( 0 );
    expect( axes.indexOf( new Axis( { name: 'height', orientation: 'up', unit, range } ) ) ).toBe( -1 );
    expect( axes.has( latitude.clone() ) ).toBe( true );
  } );

  it( 'compares axis sets', () => {
    expect( axes.equals( new AxisSet( { axes: [ longitude.clone(), latitude.clone() ] } ) ) ).toBe( true );
    expect( axes.equals( new AxisSet( { axes: [ latitude, longitude ] } ) ) ).toBe( false );
    expect( axes.equals( new AxisSet( { axes: [ longitude ] } ) ) ).toBe( false );
  } );

  it( 'clones all axes independently', () => {
    const clone = axes.clone();

    expect( clone ).not.toBe( axes );
    expect( clone.get( 0 ) ).not.toBe( longitude );
    expect( clone.equals( axes ) ).toBe( true );
  } );

  it( 'serializes and formats the set', () => {
    expect( axes.toJSON() ).toEqual( [ longitude.toJSON(), latitude.toJSON() ] );
    expect( axes.toString() ).toBe( 'Longitude [°], Latitude [°]' );
    expect( axes.toString( { displayUnit: false, delimiter: ' / ' } ) ).toBe( 'Longitude / Latitude' );
  } );

  it( 'iterates over its axes', () => {
    expect( [ ...axes ] ).toEqual( [ longitude, latitude ] );
  } );
} );
