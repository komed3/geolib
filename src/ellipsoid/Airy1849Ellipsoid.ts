import { Ellipsoid } from './Ellipsoid';


export class Airy1849Ellipsoid extends Ellipsoid {
  public constructor () {
    super( { name: 'Airy Modified 1849', semiMajorAxis: 6377340.189, inverseFlattening: 299.3249646 } );
  }
}
