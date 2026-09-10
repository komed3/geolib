import { describe, expect, it } from 'vitest';
import { Axis } from '../../src/base/Axis';
import { Range } from '../../src/base/Range';


const unit = { name: 'degree', symbol: '°' };
const range = new Range( { min: -180, max: 180 } );

const createAxis = ( behavior?: 'none' | 'clamp' | 'wrap' ) => new Axis( {
  name: 'longitude', direction: 'east', unit, range, behavior
} );
