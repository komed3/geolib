import { Ellipsoid } from './Ellipsoid';


export class Bessel1841Ellipsoid extends Ellipsoid {
  public constructor () {
    super( { name: 'Bessel 1841', semiMajorAxis: 6377397.155, inverseFlattening: 299.1528128 } );
  }
}
