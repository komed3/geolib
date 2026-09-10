import { describe, expect, it } from 'vitest';

import { Range } from '../../src/base/Range';


describe( 'Range', () => {
  it( 'creates an inclusive range by default', () => {
    const range = new Range( { min: 10, max: 20 } );

    expect( range.min ).toBe( 10 );
    expect( range.max ).toBe( 20 );
    expect( range.minInclusive ).toBe( true );
    expect( range.maxInclusive ).toBe( true );
  } );

  it( 'supports open boundaries', () => {
    const range = new Range( { min: 10, max: 20, minInclusive: false, maxInclusive: false } );

    expect( range.contains( 10 ) ).toBe( false );
    expect( range.contains( 10.1 ) ).toBe( true );
    expect( range.contains( 20 ) ).toBe( false );
    expect( range.contains( 19.9 ) ).toBe( true );
  } );

  it( 'supports unbounded ranges', () => {
    expect( new Range().contains( -Infinity ) ).toBe( true );
    expect( new Range( { min: 10 } ).contains( 100 ) ).toBe( true );
    expect( new Range( { max: 10 } ).contains( -100 ) ).toBe( true );
  } );

  it( 'clamps values to the range', () => {
    const range = new Range( { min: 10, max: 20 } );

    expect( range.clamp( 5 ) ).toBe( 10 );
    expect( range.clamp( 15 ) ).toBe( 15 );
    expect( range.clamp( 25 ) ).toBe( 20 );
  } );

  it( 'clamps correctly with unbounded sides', () => {
    expect( new Range( { min: 10 } ).clamp( 5 ) ).toBe( 10 );
    expect( new Range( { min: 10 } ).clamp( 15 ) ).toBe( 15 );
    expect( new Range( { max: 20 } ).clamp( 25 ) ).toBe( 20 );
    expect( new Range( { max: 20 } ).clamp( 15 ) ).toBe( 15 );
  } );

  it( 'compares ranges by all properties', () => {
    const range = new Range( { min: 10, max: 20, maxInclusive: false } );

    expect( range.equals( new Range( { min: 10, max: 20, maxInclusive: false } ) ) ).toBe( true );
    expect( range.equals( new Range( { min: 10, max: 20 } ) ) ).toBe( false );
    expect( range.equals( new Range( { min: 10, max: 21, maxInclusive: false } ) ) ).toBe( false );
  } );

  it( 'clones independently', () => {
    const range = new Range( { min: 10, max: 20, minInclusive: false } );
    const clone = range.clone();

    expect( clone ).not.toBe( range );
    expect( clone.equals( range ) ).toBe( true );
  } );

  it( 'serializes to JSON', () => {
    expect( new Range( { min: 10, max: 20, maxInclusive: false } ).toJSON() ).toEqual( {
      min: 10, max: 20, minInclusive: true, maxInclusive: false
    } );
  } );

  it( 'formats bounded and unbounded ranges', () => {
    expect( new Range( { min: 10, max: 20 } ).toString() ).toBe( '[10, 20]' );
    expect( new Range( { min: 10, max: 20, maxInclusive: false } ).toString() ).toBe( '[10, 20)' );
    expect( new Range().toString() ).toBe( '[-∞, ∞]' );
  } );
} );
