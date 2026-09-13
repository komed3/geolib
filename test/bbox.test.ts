import { describe, expect, it } from 'vitest';
import { BBox } from '../src/bbox';
import { Coordinate } from '../src/coord';
import { Geographic2DSystem } from '../src/system';
import { Longitude } from '../src/value/Longitude';
import { Latitude } from '../src/value/Latitude';


const system = new Geographic2DSystem();

const create = ( min: [ number, number ], max: [ number, number ] ) => new BBox( {
  min: Coordinate.fromTuple( min, system ), max: Coordinate.fromTuple( max, system )
} );
