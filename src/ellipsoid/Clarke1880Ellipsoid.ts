import { Ellipsoid } from './Ellipsoid';


export class Clarke1880Ellipsoid extends Ellipsoid {
  public constructor () {
    super( {
      name: 'Clarke 1880',
      semiMajorAxis: 6378249.14480801,
      inverseFlattening: 293.466307655636
    } );
  }
}
