import { Ellipsoid } from './Ellipsoid';


export class Airy1830Ellipsoid extends Ellipsoid {
  public constructor () {
    super( {
      name: 'Airy 1830',
      semiMajorAxis: 6377563.396,
      inverseFlattening: 299.3249646
    } );
  }
}
