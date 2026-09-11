import { Ellipsoid } from './Ellipsoid';


export class WGS84Ellipsoid extends Ellipsoid {
  public constructor () {
    super( { name: 'WGS 84', semiMajorAxis: 6378137, inverseFlattening: 298.257223563 } );
  }
}
