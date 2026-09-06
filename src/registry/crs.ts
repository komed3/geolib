import { CoordinateSystem } from '../crs/CoordinateSystem';
import { CRS } from '../crs/CRS';
import { Projection } from '../crs/Projection';
import { CRSRegistry } from './CRSRegistry';
import { ETRS89 as ETRS89_D, WGS84 as WGS84_D } from './datums';


const geographic2D = new CoordinateSystem( 'ellipsoidal', [
  { name: 'Geodetic latitude', direction: 'north', unit: 'degree' },
  { name: 'Geodetic longitude', direction: 'east', unit: 'degree' }
] );

const projected2D = new CoordinateSystem( 'cartesian', [
  { name: 'Easting', direction: 'east', unit: 'metre' },
  { name: 'Northing', direction: 'north', unit: 'metre' }
] );


export const crs = new CRSRegistry();


export const WGS84 = new CRS( 'EPSG:4326', 'WGS 84', 'geographic', WGS84_D, geographic2D );
export const ETRS89 = new CRS( 'EPSG:4258', 'ETRS89', 'geographic', ETRS89_D, geographic2D );

export const WEB_MERCATOR = new CRS(
  'EPSG:3857', 'WGS 84 / Pseudo-Mercator', 'projected', WGS84_D, projected2D,
  new Projection( 'Pseudo-Mercator', 'mercator' )
);

export const WGS84_UTM32N = new CRS(
  'EPSG:32632', 'WGS 84 / UTM zone 32N', 'projected', WGS84_D, projected2D,
  new Projection( 'UTM zone 32N', 'transverse-mercator', {
    centralMeridian: 9, scaleFactor: 0.9996, falseEasting: 500000, falseNorthing: 0
  } )
);


crs.register( WGS84 );
crs.register( ETRS89 );
crs.register( WEB_MERCATOR );
crs.register( WGS84_UTM32N );
