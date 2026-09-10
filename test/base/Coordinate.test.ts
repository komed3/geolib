import { describe, expect, it } from 'vitest';
import { Axis } from '../../src/base/Axis';
import { AxisSet } from '../../src/base/AxisSet';
import { Coordinate } from '../../src/base/Coordinate';
import { Range } from '../../src/base/Range';
import { System } from '../../src/base/System';
import { Value } from '../../src/base/Value';


const unit = { name: 'degree', symbol: '°' };
const longitude = new Axis( { name: 'longitude', direction: 'east', unit, range: new Range( { min: -180, max: 180 } ) } );
const latitude = new Axis( { name: 'latitude', direction: 'north', unit, range: new Range( { min: -90, max: 90 } ) } );
const system = new System( 'WGS84', new AxisSet( [ longitude, latitude ] ) );


describe( 'Coordinate', () => {} );
