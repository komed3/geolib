import { describe, expect, it } from 'vitest';

import { Axis } from '../src/axis/Axis';
import { AxisSet } from '../src/axis/AxisSet';
import { Coordinate } from '../src/coord/Coordinate';
import { Range } from '../src/range/Range';
import { System } from '../src/system/System';
import { Value } from '../src/value/Value';


const unit = { name: 'degree', symbol: '°' };
const longitude = new Axis( { name: 'longitude', direction: 'east', unit, range: new Range( { min: -180, max: 180 } ) } );
const latitude = new Axis( { name: 'latitude', direction: 'north', unit, range: new Range( { min: -90, max: 90 } ) } );
const system = new System( 'WGS84', new AxisSet( [ longitude, latitude ] ) );


describe( 'Coordinate', () => {
  it( 'creates an immutable coordinate', () => {
    const values = [ new Value( 12.5, longitude ), new Value( 52.5, latitude ) ];
    const coordinate = new Coordinate( system, values );

    expect( coordinate.system ).toBe( system );
    expect( coordinate.dimension ).toBe( 2 );
    expect( coordinate.get( 0 ) ).toBe( values[ 0 ] );
    expect( coordinate.get( 1 ) ).toBe( values[ 1 ] );

    values.reverse();

    expect( coordinate.get( 0 ) ).toBe( values[ 1 ] );
  } );

  it( 'compares coordinates', () => {
    const coordinate = Coordinate.fromTuple( [ 12.5, 52.5 ], system );

    expect( coordinate.equals( Coordinate.fromTuple( [ 12.5, 52.5 ], system.clone() ) ) ).toBe( true );
    expect( coordinate.equals( Coordinate.fromTuple( [ 13.5, 52.5 ], system ) ) ).toBe( false );
  } );

  it( 'clones system and values independently', () => {
    const coordinate = Coordinate.fromTuple( [ 12.5, 52.5 ], system );
    const clone = coordinate.clone();

    expect( clone ).not.toBe( coordinate );
    expect( clone.system ).not.toBe( system );
    expect( clone.get( 0 ) ).not.toBe( coordinate.get( 0 ) );
    expect( clone.equals( coordinate ) ).toBe( true );
  } );

  it( 'converts to a tuple and JSON', () => {
    const coordinate = Coordinate.fromTuple( [ 12.5, 52.5 ], system );

    expect( coordinate.toTuple() ).toEqual( [ 12.5, 52.5 ] );
    expect( coordinate.toJSON() ).toEqual( { system: 'WGS84', values: [ 12.5, 52.5 ] } );
  } );

  it( 'formats coordinate values', () => {
    const coordinate = Coordinate.fromTuple( [ 12.5, 52.5 ], system );

    expect( coordinate.toString() ).toBe( '12.5°, 52.5°' );
    expect( coordinate.toString( { precision: 2, showUnit: false, delimiter: ' / ' } ) ).toBe( '12.50 / 52.50' );
  } );

  it( 'creates coordinates from tuples', () => {
    const coordinate = Coordinate.fromTuple( [ 12.5, 52.5 ], system );

    expect( coordinate.get( 0 ).value ).toBe( 12.5 );
    expect( coordinate.get( 1 ).value ).toBe( 52.5 );
    expect( coordinate.get( 0 ).axis ).toBe( longitude );
    expect( coordinate.get( 1 ).axis ).toBe( latitude );
  } );
} );
