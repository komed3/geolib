import { Ellipsoid } from './Ellipsoid';


export class Krassowsky1940Ellipsoid extends Ellipsoid {
  public constructor () {
    super( {
      name: 'Krassowsky 1940',
      semiMajorAxis: 6378245,
      inverseFlattening: 298.3
    } );
  }
}
