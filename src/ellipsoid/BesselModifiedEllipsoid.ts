import { Ellipsoid } from './Ellipsoid';


export class BesselModifiedEllipsoid extends Ellipsoid {
  public constructor () {
    super( { name: 'Bessel Modified', semiMajorAxis: 6377492.018, inverseFlattening: 299.1528128 } );
  }
}
