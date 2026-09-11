import { describe, expect, it } from 'vitest';
import { Axis, AxisSet, LatitudeAxis, LongitudeAxis } from '../src/axis';
import { Range } from '../src/range';
import { Unit } from '../src/unit';


const latitude = new LatitudeAxis(), longitude = new LongitudeAxis();
const axes = new AxisSet( { axes: [ longitude, latitude ] } );
const unit = new Unit( { name: 'degree', unit: '°', quantity: 'angle' } );
const range = new Range( { min: -180, max: 180 } );

const createAxis = ( behavior?: 'none' | 'clamp' | 'wrap' ) => new Axis( {
  name: 'Longitude', abbr: 'Lon', orientation: 'east', unit, range, behavior
} );


describe( 'Axis', () => {
  it( 'creates an axis with default behavior', () => {
    const axis = createAxis();

    expect( axis.name ).toBe( 'Longitude' );
    expect( axis.abbr ).toBe( 'Lon' );
    expect( axis.orientation ).toBe( 'east' );
    expect( axis.unit ).toBe( unit );
    expect( axis.range ).toBe( range );
    expect( axis.behavior ).toBe( 'none' );
  } );

  it( 'leaves values unchanged with no behavior', () => {
    expect( createAxis().normalize( 200 ) ).toBe( 200 );
  } );

  it( 'clamps values', () => {
    const axis = createAxis( 'clamp' );

    expect( axis.normalize( -200 ) ).toBe( -180 );
    expect( axis.normalize( 0 ) ).toBe( 0 );
    expect( axis.normalize( 200 ) ).toBe( 180 );
  } );

  it( 'wraps values when the range is bounded', () => {
    const axis = createAxis( 'wrap' );

    expect( axis.normalize( 190 ) ).toBe( -170 );
    expect( axis.normalize( -190 ) ).toBe( 170 );
  } );

  it( 'does not wrap an unbounded range', () => {
    expect( new Axis( {
      name: 'x', orientation: 'east', unit, behavior: 'wrap',
      range: new Range( { min: -180 } )
    } ).normalize( 200 ) ).toBe( 200 );
  } );

  it( 'compares axes by their properties', () => {
    const axis = createAxis( 'clamp' );

    expect( axis.equals( createAxis( 'clamp' ) ) ).toBe( true );
    expect( axis.equals( createAxis( 'none' ) ) ).toBe( false );

    expect( axis.equals( new Axis( {
      name: 'latitude', orientation: 'north', unit, range, behavior: 'clamp'
    } ) ) ).toBe( false );
  } );

  it( 'clones independently', () => {
    const axis = createAxis( 'clamp' );
    const clone = axis.clone();

    expect( clone ).not.toBe( axis );
    expect( clone.range ).not.toBe( axis.range );
    expect( clone.equals( axis ) ).toBe( true );
  } );

  it( 'serializes to JSON', () => {
    expect( createAxis( 'clamp' ).toJSON() ).toEqual( {
      name: 'Longitude', orientation: 'east', unit, range, behavior: 'clamp', abbr: 'Lon'
    } );
  } );

  it( 'formats with and without the unit', () => {
    const axis = createAxis();

    expect( axis.toString() ).toBe( 'Longitude [°]' );
    expect( axis.toString( { displayUnit: false } ) ).toBe( 'Longitude' );
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
