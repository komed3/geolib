import { Ellipsoid } from './Ellipsoid';


export class GRS1967Ellipsoid extends Ellipsoid {
  public constructor () {
    super( { name: 'GRS 1967', semiMajorAxis: 6378160, inverseFlattening: 298.247167427 } );
  }
}
