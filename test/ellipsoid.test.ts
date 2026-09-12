import { describe, expect, it } from 'vitest';
import { Ellipsoid } from '../src/ellipsoid';


const ellipsoid = new Ellipsoid( { name: 'Test Ellipsoid', semiMajorAxis: 10, inverseFlattening: 5 } );
const sphere = new Ellipsoid( { name: 'Test Sphere', semiMajorAxis: 10 } );
