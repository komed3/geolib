import { Ellipsoid } from './Ellipsoid';


export class Clarke1858Ellipsoid extends Ellipsoid {
  public constructor () {
    super( {
      name: 'Clarke 1858',
      semiMajorAxis: 6378293.64520876,
      inverseFlattening: 294.260676369261
    } );
  }
}
