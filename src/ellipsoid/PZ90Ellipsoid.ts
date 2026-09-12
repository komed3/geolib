import { Ellipsoid } from './Ellipsoid';


export class PZ90Ellipsoid extends Ellipsoid {
  public constructor () {
    super( {
      name: 'PZ-90',
      semiMajorAxis: 6378136,
      inverseFlattening: 298.257839303
    } );
  }
}
