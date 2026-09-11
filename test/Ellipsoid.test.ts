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
} );
