import { Ellipsoid } from './Ellipsoid';


export class WGS72Ellipsoid extends Ellipsoid {
  public constructor () {
    super( { name: 'WGS 72', semiMajorAxis: 6378135, inverseFlattening: 298.26 } );
  }
}
