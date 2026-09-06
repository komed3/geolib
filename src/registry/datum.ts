import { Datum } from '../crs/Datum';
import { DatumRegistry } from './DatumRegistry';
import { GRS80, WGS84 } from './ellipsoids';


export const datums = new DatumRegistry();

export const WGS84_DATUM = new Datum( 'EPSG:6326', 'World Geodetic System 1984', WGS84 );
export const ETRS89 = new Datum( 'EPSG:6258', 'European Terrestrial Reference System 1989', GRS80 );
export const NAD83 = new Datum( 'EPSG:6269', 'North American Datum 1983', GRS80 );

datums.register( WGS84_DATUM );
datums.register( ETRS89 );
datums.register( NAD83 );
