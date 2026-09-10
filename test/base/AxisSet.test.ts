import { describe, expect, it } from 'vitest';
import { Axis } from '../../src/base/Axis';
import { AxisSet } from '../../src/base/AxisSet';
import { Range } from '../../src/base/Range';


const unit = { name: 'degree', symbol: '°' };

const longitude = new Axis( {
  name: 'longitude', direction: 'east', unit,
  range: new Range( { min: -180, max: 180 } )
} );

const latitude = new Axis( {
  name: 'latitude', direction: 'north', unit,
  range: new Range( { min: -90, max: 90 } )
} );


describe( 'AxisSet', () => {} );
