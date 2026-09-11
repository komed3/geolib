import { Ellipsoid } from './Ellipsoid';


export class Everest1830Ellipsoid extends Ellipsoid {
  public constructor () {
    super( {
      name: 'Everest (1830 Definition)',
      semiMajorAxis: 6377299.36559538,
      inverseFlattening: 300.801725543355
    } );
  }
}
