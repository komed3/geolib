import { CoordinateSystem } from '../crs/CoordinateSystem';
import { CRSRegistry } from './CRSRegistry';


const geographic2D = new CoordinateSystem( 'ellipsoidal', [
  { name: 'Geodetic latitude', direction: 'north', unit: 'degree' },
  { name: 'Geodetic longitude', direction: 'east', unit: 'degree' }
] );

const projected2D = new CoordinateSystem( 'cartesian', [
  { name: 'Easting', direction: 'east', unit: 'metre' },
  { name: 'Northing', direction: 'north', unit: 'metre' }
] );


export const crs = new CRSRegistry();
