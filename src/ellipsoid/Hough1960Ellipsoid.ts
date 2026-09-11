import { Ellipsoid } from './Ellipsoid';


export class Hough1960Ellipsoid extends Ellipsoid {
  public constructor () {
    super( { name: 'Hough 1960', semiMajorAxis: 6378270, inverseFlattening: 297 } );
  }
}
