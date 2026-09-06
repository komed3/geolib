import { Datum } from './Datum';
import { ELLIPSOIDS } from './ellipsoids';


export const DATUMS = {
  WGS84: new Datum( 'WGS 84', ELLIPSOIDS.WGS84 ),
  NAD83: new Datum( 'North American Datum 1983', ELLIPSOIDS.GRS80 ),
  OSGB36: new Datum( 'Ordnance Survey Great Britain 1936', ELLIPSOIDS.AIRY1830 ),
  ED50: new Datum( 'European Datum 1950', ELLIPSOIDS.INTERNATIONAL1924 )
} as const;
