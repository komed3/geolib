import { Ellipsoid } from './Ellipsoid';


export class AustralianNationalSpheroidEllipsoid extends Ellipsoid {
  public constructor () {
    super( {
      name: 'Australian National Spheroid',
      semiMajorAxis: 6378160, inverseFlattening: 298.25
    } );
  }
}
