import { describe, expect, it } from 'vitest';
import { Axis, AxisSet, LatitudeAxis, LongitudeAxis } from '../src/axis';
import { Range } from '../src/range';
import { Unit } from '../src/unit';


const latitude = new LatitudeAxis(), longitude = new LongitudeAxis();
const unit = new Unit( { name: 'metre', unit: 'm', quantity: 'length' } ), range = new Range();
const set = new AxisSet( { axes: [ longitude, latitude ] } );


describe( 'Axis', () => {
  it( '', () => {} );
} );

describe( 'AxisSet', () => {
  it( 'creates an immutable axis collection', () => {
    expect( set.dimension ).toBe( 2 );
    expect( set.get( 0 ) ).toBe( longitude );
    expect( set.get( 1 ) ).toBe( latitude );
    expect( set.toArray() ).toEqual( [ longitude, latitude ] );
  } );

  it( 'finds and checks axes by equality', () => {
    expect( set.indexOf( latitude ) ).toBe( 1 );
    expect( set.indexOf( longitude.clone() ) ).toBe( 0 );
    expect( set.indexOf( new Axis( { name: 'height', orientation: 'up', unit, range } ) ) ).toBe( -1 );
    expect( set.has( latitude.clone() ) ).toBe( true );
  } );
} );
