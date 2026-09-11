import { describe, expect, it } from 'vitest';

import { Ellipsoid } from '../src/ellipsoid/Ellipsoid';
import { Axis } from '../src/axis/Axis';
import { Range } from '../src/range/Range';
import { Latitude } from '../src/value/Latitude';


const unit = { name: 'degree', symbol: '°' };
const latitude = new Axis( { name: 'latitude', direction: 'north', unit, range: new Range( { min: -90, max: 90 } ) } );
const ellipsoid = new Ellipsoid( { name: 'Test Ellipsoid', semiMajorAxis: 10, inverseFlattening: 5 } );
const sphere = new Ellipsoid( { name: 'Test Sphere', semiMajorAxis: 10 } );


describe( 'Ellipsoid', () => {
  it( 'creates an ellipsoid from its defining parameters', () => {
    expect( ellipsoid.name ).toBe( 'Test Ellipsoid' );
    expect( ellipsoid.semiMajorAxis ).toBe( 10 );
    expect( ellipsoid.inverseFlattening ).toBe( 5 );
  } );

  it( 'defaults to a sphere when inverse flattening is omitted', () => {
    expect( sphere.inverseFlattening ).toBe( Infinity );
    expect( sphere.flattening ).toBe( 0 );
    expect( sphere.isSphere ).toBe( true );
    expect( sphere.semiMinorAxis ).toBe( 10 );
  } );

  it( 'calculates derived ellipsoid parameters', () => {
    expect( ellipsoid.flattening ).toBe( 0.2 );
    expect( ellipsoid.semiMinorAxis ).toBe( 8 );
    expect( ellipsoid.linearEccentricity ).toBe( 6 );
    expect( ellipsoid.eccentricitySquared ).toBeCloseTo( 0.36 );
    expect( ellipsoid.eccentricity ).toBeCloseTo( 0.6 );
    expect( ellipsoid.secondEccentricitySquared ).toBeCloseTo( 0.5625 );
    expect( ellipsoid.secondEccentricity ).toBeCloseTo( 0.75 );
    expect( ellipsoid.thirdFlattening ).toBeCloseTo( 0.1111111111111111 );
  } );

  it( 'calculates volumetric radius', () => {
    expect( ellipsoid.volumetricRadius ).toBeCloseTo( Math.cbrt( 10 ** 2 * 8 ) );
    expect( sphere.volumetricRadius ).toBeCloseTo( 10 );
  } );

  it( 'calculates authalic radius', () => {
    expect( sphere.authalicRadius ).toBe( 10 );
    expect( ellipsoid.authalicRadius ).toBeCloseTo( 9.3256554531 );
  } );

  it( 'calculates the prime vertical radius', () => {
    expect( ellipsoid.primeVerticalRadius( 0 ) ).toBeCloseTo( 10 );
    expect( ellipsoid.primeVerticalRadius( Math.PI / 2 ) ).toBeCloseTo( 12.5 );
    expect( ellipsoid.primeVerticalRadius( new Latitude( 90, latitude ) ) ).toBeCloseTo( 12.5 );
  } );

  it( 'calculates the meridional radius', () => {
    expect( ellipsoid.meridionalRadius( 0 ) ).toBeCloseTo( 6.4 );
    expect( ellipsoid.meridionalRadius( Math.PI / 2 ) ).toBeCloseTo( 12.5 );
    expect( ellipsoid.meridionalRadius( new Latitude( 90, latitude ) ) ).toBeCloseTo( 12.5 );
  } );

  it( 'calculates the geocentric radius', () => {
    expect( ellipsoid.geocentricRadius( 0 ) ).toBeCloseTo( 10 );
    expect( ellipsoid.geocentricRadius( Math.PI / 2 ) ).toBeCloseTo( 8 );
    expect( ellipsoid.geocentricRadius( new Latitude( 90, latitude ) ) ).toBeCloseTo( 8 );
  } );

  it( 'calculates surface area', () => {
    expect( sphere.surfaceArea() ).toBeCloseTo( 4 * Math.PI * 100 );
    expect( ellipsoid.surfaceArea() ).toBeCloseTo( 1092.87022998 );
  } );

  it( 'calculates volume', () => {
    expect( sphere.volume() ).toBeCloseTo( 4 / 3 * Math.PI * 1000 );
    expect( ellipsoid.volume() ).toBeCloseTo( 4 / 3 * Math.PI * 800 );
  } );

  it( 'compares ellipsoids', () => {
    const equal = new Ellipsoid( { name: 'Test Ellipsoid', semiMajorAxis: 10, inverseFlattening: 5 } );
    const diff1 = new Ellipsoid( { name: 'Other Ellipsoid', semiMajorAxis: 10, inverseFlattening: 5 } );
    const diff2 = new Ellipsoid( { name: 'Test Ellipsoid', semiMajorAxis: 8 } );

    expect( ellipsoid.equals( equal ) ).toBe( true );
    expect( ellipsoid.equals( diff1 ) ).toBe( false );
    expect( ellipsoid.equals( diff2 ) ).toBe( false );
  } );

  it( 'clones an ellipsoid', () => {
    const clone = ellipsoid.clone();

    expect( clone ).not.toBe( ellipsoid );
    expect( clone ).toEqual( ellipsoid );
  } );

  it( 'serializes an ellipsoid', () => {
    expect( ellipsoid.toJSON() ).toEqual( { name: 'Test Ellipsoid', semiMajorAxis: 10, inverseFlattening: 5 } );
  } );

  it( 'formats an ellipsoid as a string', () => {
    expect( ellipsoid.toString() ).toBe( 'Test Ellipsoid (a=10, 1/f=5)' );
    expect( ellipsoid.toString( { precision: 2 } ) ).toBe( 'Test Ellipsoid (a=10, 1/f=5)' );
    expect( sphere.toString() ).toBe( 'Test Sphere (a=10, 1/f=∞)' );
  } );
} );
