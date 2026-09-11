import { Ellipsoid } from './Ellipsoid';


export class Everest1937Ellipsoid extends Ellipsoid {
  public constructor () {
    super( {
      name: 'Everest 1830 (1937 Adjustment)',
      semiMajorAxis: 6377276.345,
      inverseFlattening: 300.8017
    } );
  }
}
