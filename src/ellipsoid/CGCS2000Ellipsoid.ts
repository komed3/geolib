import { Ellipsoid } from './Ellipsoid';


export class CGCS2000Ellipsoid extends Ellipsoid {
  public constructor () {
    super( {
      name: 'CGCS 2000',
      semiMajorAxis: 6378137,
      inverseFlattening: 298.257222101
    } );
  }
}
