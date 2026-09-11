import { Ellipsoid } from './Ellipsoid';


export class Struve1860Ellipsoid extends Ellipsoid {
  public constructor () {
    super( { name: 'Struve 1860', semiMajorAxis: 6378298.3, inverseFlattening: 294.73 } );
  }
}
