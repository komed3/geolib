import { describe, expect, it } from 'vitest';
import { LongitudeAxis } from '../src/axis';
import { DegreeValue, Value } from '../src/value';


const axis = new LongitudeAxis();


describe( 'Value', () => {
  it( 'initializes its value through the axis', () => {
    expect( new Value( 200, axis ).value ).toBe( -160 );
    expect( new Value( 42, axis ).value ).toBe( 42 );
  } );

  it( 'compares values and axes', () => {
    const value = new Value( 42, axis );

    expect( value.equals( new Value( 42, axis.clone() ) ) ).toBe( true );
    expect( value.equals( new Value( 43, axis ) ) ).toBe( false );
  } );

  it( 'clones independently', () => {
    const value = new Value( 42, axis );
    const clone = value.clone();

    expect( clone ).not.toBe( value );
    expect( clone.axis ).not.toBe( axis );
    expect( clone.equals( value ) ).toBe( true );
  } );

  it( 'serializes to JSON', () => {
    expect( new Value( 42, axis ).toJSON() ).toEqual( { value: 42, axis: axis.toJSON() } );
  } );

  it( 'formats values with locale, precision and unit options', () => {
    const value = new Value( 42.5, axis );

    expect( value.toString() ).toBe( '42.5°' );
    expect( value.toString( { maxPrecision: 2 } ) ).toBe( '42.5°' );
    expect( value.toString( { maxPrecision: 2, displayUnit: false } ) ).toBe( '42.5' );
    expect( value.toString( { locale: 'de-DE', maxPrecision: 2 } ) ).toBe( '42,5°' );
  } );

  it ( 'convert degree value to radian', () => {
    expect( new DegreeValue( 90, axis ).toRadians() ).toBe( Math.PI / 2 );
  } );
} );
