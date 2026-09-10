import { describe, expect, it } from 'vitest';
import { Axis } from '../../src/base/Axis';
import { Range } from '../../src/base/Range';
import { Value } from '../../src/base/Value';


const unit = { name: 'degree', symbol: '°' };

const axis = new Axis( {
  name: 'longitude', direction: 'east', unit, behavior: 'clamp',
  range: new Range( { min: -180, max: 180 } )
} );


describe( 'Value', () => {} );
