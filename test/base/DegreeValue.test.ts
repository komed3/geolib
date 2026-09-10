import { describe, expect, it } from 'vitest';

import { Axis } from '../../src/core/Axis';
import { DegreeValue } from '../../src/core/DegreeValue';
import { Range } from '../../src/core/Range';


const unit = { name: 'degree', symbol: '°' };
const longitude = new Axis( { name: 'longitude', direction: 'east', unit, range: new Range( { min: -180, max: 180 } ) } );
const latitude = new Axis( { name: 'latitude', direction: 'north', unit, range: new Range( { min: -90, max: 90 } ) } );
const invalid = new Axis( { name: 'x', direction: 'up', unit, range: new Range() } );


describe( 'DegreeValue', () => {
  it( 'converts degrees to radians', () => {
    expect( new DegreeValue( 180, longitude ).toRadians() ).toBeCloseTo( Math.PI );
    expect( new DegreeValue( 90, latitude ).toRadians() ).toBeCloseTo( Math.PI / 2 );
  } );

  it( 'converts longitude values to east/west DMS', () => {
    const east = new DegreeValue( 12.5, longitude ).toDMS();
    const west = new DegreeValue( -12.5, longitude ).toDMS();

    expect( east.direction ).toBe( 'east' );
    expect( west.direction ).toBe( 'west' );
    expect( east.value ).toBe( 12.5 );
    expect( west.value ).toBe( -12.5 );
  } );

  it( 'converts latitude values to north/south DMS', () => {
    const north = new DegreeValue( 52.5, latitude ).toDMS();
    const south = new DegreeValue( -52.5, latitude ).toDMS();

    expect( north.direction ).toBe( 'north' );
    expect( south.direction ).toBe( 'south' );
    expect( north.value ).toBe( 52.5 );
    expect( south.value ).toBe( -52.5 );
  } );

  it( 'rejects axes without a geographic direction', () => {
    expect( () => new DegreeValue( 10, invalid ).toDMS() ).toThrow(
      'Cannot convert to DMS without a valid axis direction'
    );
  } );
} );
