import { describe, expect, it } from 'vitest';
import { Axis } from '../../src/base/Axis';
import { Range } from '../../src/base/Range';


const unit = { name: 'degree', symbol: '°' };
const range = new Range( { min: -180, max: 180 } );

const createAxis = ( behavior?: 'none' | 'clamp' | 'wrap' ) => new Axis( {
  name: 'longitude', direction: 'east', unit, range, behavior
} );


describe( 'Axis', () => {
  it( 'creates an axis with default behavior', () => {
    const axis = createAxis();

    expect( axis.name ).toBe( 'longitude' );
    expect( axis.direction ).toBe( 'east' );
    expect( axis.unit ).toBe( unit );
    expect( axis.range ).toBe( range );
    expect( axis.behavior ).toBe( 'none' );
  } );

  it( 'leaves values unchanged with no behavior', () => {
    expect( createAxis().initialize( 200 ) ).toBe( 200 );
  } );
} );
