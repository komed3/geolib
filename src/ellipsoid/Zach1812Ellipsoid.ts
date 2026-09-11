import { Ellipsoid } from './Ellipsoid';


export class Zach1812Ellipsoid extends Ellipsoid {
  public constructor () {
    super( { name: 'Zach 1812', semiMajorAxis: 6376045, inverseFlattening: 310 } );
  }
}
