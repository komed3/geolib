import { describe, expect, it } from 'vitest';
import { Degree, Kilometre, Metre, Radian, Second, Year } from '../src/unit';


describe( 'Unit', () => {
  const metre = new Metre(), kilometre = new Kilometre(), second = new Second(),
    year = new Year(), degree = new Degree(), radian = new Radian();

  it( 'creates a new Unit', () => {
    expect( metre.name ).toBe( 'metre' );
    expect( metre.unit ).toBe( 'm' );
    expect( metre.quantity ).toBe( 'length' );
    expect( metre.factor ).toBe( 1 );
  } );

  it( 'transforms a value to SI value', () => {
    expect( kilometre.toSI( 1 ) ).toBe( 1000 );
    expect( year.toSI( 1 ) ).toBe( 31558149.54 );
  } );

  it( 'transforms a value from one unit to another', () => {
    expect( kilometre.transform( 1, metre ) ).toBe( 0.001 );
    expect( metre.transform( 1, kilometre ) ).toBe( 1000 );
  } );

  it( 'transforms degree to radian', () => {
    expect( radian.transform( 180, degree ) ).toBe( Math.PI );
    expect( degree.transform( Math.PI, radian ) ).toBe( 180 );
  } );

  it( 'throws an error when transforming between different quantities', () => {
    expect( () => metre.transform( 1, second ) ).toThrow(
      'Cannot transform second (time) to metre (length)'
    );
  } );

  it( 'clones a unit', () => {
    const clone = metre.clone();

    expect( clone ).not.toBe( metre );
    expect( clone.equals( metre ) ).toBe( true );
  } );

  it( 'converts a unit to JSON', () => {
    expect( metre.toJSON() ).toEqual( { name: 'metre', unit: 'm', quantity: 'length', factor: 1 } );
  } );

  it( 'converts a unit to string', () => {
    expect( metre.toString() ).toBe( 'm' );
    expect( metre.toString( { unitFormat: 'name' } ) ).toBe( 'metre' );
  } );
} );
