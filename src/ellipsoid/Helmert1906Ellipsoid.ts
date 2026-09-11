import { Ellipsoid } from './Ellipsoid';


export class Helmert1906Ellipsoid extends Ellipsoid {
  public constructor () {
    super( { name: 'Helmert 1906', semiMajorAxis: 6378200, inverseFlattening: 298.3 } );
  }
}
