import { Ellipsoid } from '../crs/Ellipsoid';
import { EllipsoidRegistry } from './EllipsoidRegistry';


export const ellipsoids = new EllipsoidRegistry();


export const WGS84 = new Ellipsoid( 'EPSG:7030', 6378137, 298.257223563 );
export const GRS80 = new Ellipsoid( 'EPSG:7019', 6378137, 298.257222101 );
export const CLARKE1866 = new Ellipsoid( 'EPSG:7008', 6378206.4, 294.9786982 );


ellipsoids.register( WGS84 );
ellipsoids.register( GRS80 );
ellipsoids.register( CLARKE1866 );
