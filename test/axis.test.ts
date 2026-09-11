import { describe, expect, it } from 'vitest';
import { AxisSet, LatitudeAxis, LongitudeAxis } from '../src/axis';


const latitude = new LatitudeAxis(), longitude = new LongitudeAxis();


describe( 'Axis', () => {
  it( '', () => {} );
} );

describe( 'AxisSet', () => {
  it( 'creates an immutable axis collection', () => {
    const axes = new AxisSet( { axes: [ longitude, latitude ] } );

    expect( axes.dimension ).toBe( 2 );
    expect( axes.get( 0 ) ).toBe( longitude );
    expect( axes.get( 1 ) ).toBe( latitude );
    expect( axes.toArray() ).toEqual( [ longitude, latitude ] );
  } );
} );
