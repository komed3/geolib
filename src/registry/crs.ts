import { CoordinateSystem } from '../crs/CoordinateSystem';
import { CRS } from '../crs/CRS';
import { CRSRegistry } from './CRSRegistry';
import { datums } from './datum';


const geographic2D = new CoordinateSystem( 'ellipsoidal', [
  { name: 'Geodetic latitude', direction: 'north', unit: 'degree' },
  { name: 'Geodetic longitude', direction: 'east', unit: 'degree' }
] );

const projected2D = new CoordinateSystem( 'cartesian', [
  { name: 'Easting', direction: 'east', unit: 'metre' },
  { name: 'Northing', direction: 'north', unit: 'metre' }
] );


export const crs = new CRSRegistry();

export const WGS84 = new CRS(
  'EPSG:4326',
  'WGS 84',
  'geographic',
  datums.get( 'EPSG:6326' )!,
  geographic2D
);
