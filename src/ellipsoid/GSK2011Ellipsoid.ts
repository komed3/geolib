import { Ellipsoid } from './Ellipsoid';


export class GSK2011Ellipsoid extends Ellipsoid {
  public constructor () {
    super( { name: 'GSK-2011', semiMajorAxis: 6378136.5, inverseFlattening: 298.2564151 } );
  }
}
