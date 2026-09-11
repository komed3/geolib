import { Ellipsoid } from './Ellipsoid';


export class Danish1876Ellipsoid extends Ellipsoid {
  public constructor () {
    super( { name: 'Danish 1876', semiMajorAxis: 6377019.27, inverseFlattening: 300 } );
  }
}
