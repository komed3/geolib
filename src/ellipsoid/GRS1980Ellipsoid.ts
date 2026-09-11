import { Ellipsoid } from './Ellipsoid';


export class GRS1980Ellipsoid extends Ellipsoid {
  public constructor () {
    super( { name: 'GRS 1980', semiMajorAxis: 6378137, inverseFlattening: 298.257222101 } );
  }
}
