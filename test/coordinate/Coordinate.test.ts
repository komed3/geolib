import { describe, expect, it } from 'vitest';

import { Coordinate } from '../../src/coordinate/Coordinate';
import { DMS } from '../../src/coordinate/DMS';
import { Latitude } from '../../src/coordinate/Latitude';
import { Longitude } from '../../src/coordinate/Longitude';


describe( 'Coordinate', () => {
  const coordinate = Coordinate.fromDegrees( 50.827, 12.921 );

  it( 'creates a coordinate from degrees', () => {
    expect( coordinate.latitude.value ).toBe( 50.827 );
    expect( coordinate.longitude.value ).toBe( 12.921 );
  } );

  it( 'creates a coordinate from a tuple', () => {
    const result = Coordinate.fromTuple( [ 50.827, 12.921 ] );

    expect( result.equals( coordinate ) ).toBe( true );
  } );

  it( 'creates a coordinate from radians', () => {
    const result = Coordinate.fromRadians( 50.827 * Math.PI / 180, 12.921 * Math.PI / 180 );

    expect( result.latitude.value ).toBeCloseTo( 50.827 );
    expect( result.longitude.value ).toBeCloseTo( 12.921 );
  } );

  it( 'creates a coordinate from DMS', () => {
    const result = Coordinate.fromDMS( new DMS( 50, 49, 37.2, 'N' ), new DMS( 12, 55, 15.6, 'E' ) );

    expect( result.latitude.value ).toBeCloseTo( 50.827 );
    expect( result.longitude.value ).toBeCloseTo( 12.921 );
  } );

  it( 'rejects invalid DMS directions', () => {
    expect( () => Coordinate.fromDMS(
      new DMS( 50, 0, 0, 'E' ), new DMS( 12, 0, 0, 'N' )
    ) ).toThrow( TypeError );
  } );

  it( 'returns a tuple', () => {
    expect( coordinate.toTuple() ).toEqual( [ 50.827, 12.921 ] );
  } );

  it( 'returns radians', () => {
    const [ latitude, longitude ] = coordinate.toRadians();

    expect( latitude ).toBeCloseTo( 50.827 * Math.PI / 180 );
    expect( longitude ).toBeCloseTo( 12.921 * Math.PI / 180 );
  } );

  it( 'returns DMS values', () => {
    const [ latitude, longitude ] = coordinate.toDMS();

    expect( latitude ).toEqual( DMS.fromLatitude( 50.827 ) );
    expect( longitude ).toEqual( DMS.fromLongitude( 12.921 ) );
  } );

  it( 'clones a coordinate', () => {
    const clone = coordinate.clone();

    expect( clone ).not.toBe( coordinate );
    expect( clone.equals( coordinate ) ).toBe( true );
  } );

  it( 'compares coordinates', () => {
    expect( coordinate.equals( Coordinate.fromDegrees( 50.827, 12.921 ) ) ).toBe( true );
    expect( coordinate.equals( Coordinate.fromDegrees( 50.828, 12.921 ) ) ).toBe( false );
    expect( coordinate.equals( Coordinate.fromDegrees( 50.827, 12.922 ) ) ).toBe( false );
  } );

  it( 'formats a coordinate', () => {
    expect( coordinate.toString() ).toBe( '50.827;12.921' );
  } );

  it( 'supports formatting options', () => {
    expect( coordinate.toString( {
      precision: 2, showUnit: true, delimiter: ', '
    } ) ).toBe( '50.83°, 12.92°' );
  } );

  it( 'accepts coordinate components directly', () => {
    const result = new Coordinate( new Latitude( 50.827 ), new Longitude( 12.921 ) );

    expect( result.equals( coordinate ) ).toBe( true );
  } );
} );
