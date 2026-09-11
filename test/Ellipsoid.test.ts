import { describe, expect, it } from 'vitest';

import { Ellipsoid } from '../src/ellipsoid/Ellipsoid';
import { Axis } from '../src/axis/Axis';
import { Range } from '../src/range/Range';
import { Latitude } from '../src/value/Latitude';


const unit = { name: 'degree', symbol: '°' };
const latitude = new Axis( { name: 'latitude', direction: 'north', unit, range: new Range( { min: -90, max: 90 } ) } );
const ellipsoid = new Ellipsoid( { name: 'Test Ellipsoid', semiMajorAxis: 10, inverseFlattening: 5 } );
const sphere = new Ellipsoid( { name: 'Test Sphere', semiMajorAxis: 10 } );


describe( 'Ellipsoid', () => {} );
