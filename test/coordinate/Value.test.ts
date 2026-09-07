import { describe, expect, it } from 'vitest';
import { Value } from '../../src/coordinate/Value';


class TestValue extends Value {}


describe( 'Value', () => {
  it( 'stores the value', () => {
    expect( new TestValue( 42.5 ).value ).toBe( 42.5 );
  } );

  it( 'converts degrees to radians', () => {
    expect( new TestValue( 180 ).toRadians() ).toBeCloseTo( Math.PI );
  } );

  it( 'formats the value', () => {
    expect( new TestValue( 42.1234 ).toString() ).toBe( '42.1234' );
  } );

  it( 'formats the value with precision', () => {
    expect( new TestValue( 42.1234 ).toString( { precision: 2 } ) ).toBe( '42.12' );
  } );

  it( 'formats the value with a unit', () => {
    expect( new TestValue( 42.5 ).toString( { showUnit: true } ) ).toBe( '42.5°' );
  } );

  it( 'supports a locale', () => {
    expect( new TestValue( 1234.5 ).toString( { lang: 'de-DE' } ) ).toBe( '1.234,5' );
  } );
} );
