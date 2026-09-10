import { describe, expect, it } from 'vitest';

import { Axis } from '../../src/base/Axis';
import { Range } from '../../src/base/Range';
import { Value } from '../../src/base/Value';


const unit = { name: 'degree', symbol: '°' };

const axis = new Axis( {
  name: 'longitude', direction: 'east', unit, behavior: 'clamp',
  range: new Range( { min: -180, max: 180 } )
} );


describe( 'Value', () => {
  it( 'initializes its value through the axis', () => {
    expect( new Value( 200, axis ).value ).toBe( 180 );
    expect( new Value( 42, axis ).value ).toBe( 42 );
  } );

  it( 'returns its numeric value', () => {
    expect( new Value( 42, axis ).toNumber() ).toBe( 42 );
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
    expect( value.toString( { precision: 2 } ) ).toBe( '42.50°' );
    expect( value.toString( { precision: 2, showUnit: false } ) ).toBe( '42.50' );
    expect( value.toString( { locale: 'de-DE', precision: 2 } ) ).toBe( '42,50°' );
  } );
} );
