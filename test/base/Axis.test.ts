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

  it( 'clamps values', () => {
    const axis = createAxis( 'clamp' );

    expect( axis.initialize( -200 ) ).toBe( -180 );
    expect( axis.initialize( 0 ) ).toBe( 0 );
    expect( axis.initialize( 200 ) ).toBe( 180 );
  } );

  it( 'wraps values when the range is bounded', () => {
    const axis = createAxis( 'wrap' );

    expect( axis.initialize( 190 ) ).toBe( -170 );
    expect( axis.initialize( -190 ) ).toBe( 170 );
  } );

  it( 'does not wrap an unbounded range', () => {
    const axis = new Axis( {
      name: 'x', direction: 'east', unit, behavior: 'wrap',
      range: new Range( { min: -180 } )
    } );

    expect( axis.initialize( 200 ) ).toBe( 200 );
  } );

  it( 'compares axes by their properties', () => {
    const axis = createAxis( 'clamp' );

    expect( axis.equals( createAxis( 'clamp' ) ) ).toBe( true );
    expect( axis.equals( createAxis( 'none' ) ) ).toBe( false );

    expect( axis.equals( new Axis( {
      name: 'latitude', direction: 'north', unit, range, behavior: 'clamp'
    } ) ) ).toBe( false );
  } );

  it( 'clones independently', () => {
    const axis = createAxis( 'clamp' );
    const clone = axis.clone();

    expect( clone ).not.toBe( axis );
    expect( clone.range ).not.toBe( axis.range );
    expect( clone.equals( axis ) ).toBe( true );
  } );

  it( 'serializes to JSON', () => {
    expect( createAxis( 'clamp' ).toJSON() ).toEqual( {
      name: 'longitude', direction: 'east', unit, range, behavior: 'clamp'
    } );
  } );
} );
