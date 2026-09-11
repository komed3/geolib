import { Ellipsoid } from './Ellipsoid';


export class International1924Ellipsoid extends Ellipsoid {
  public constructor () {
    super( { name: 'International 1924', semiMajorAxis: 6378388, inverseFlattening: 297 } );
  }
}
