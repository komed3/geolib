import { Ellipsoid } from './Ellipsoid';


export const ELLIPSOIDS = {
  WGS84: new Ellipsoid( 6378137, 298.257223563 ),
  GRS80: new Ellipsoid( 6378137, 298.257222101 ),
  AIRY1830: new Ellipsoid( 6377563.396, 299.3249646 ),
  BESSEL1841: new Ellipsoid( 6377397.155, 299.1528128 ),
  CLARKE1866: new Ellipsoid( 6378206.4, 294.9786982 ),
  INTERNATIONAL1924: new Ellipsoid( 6378388, 297 )
} as const;
