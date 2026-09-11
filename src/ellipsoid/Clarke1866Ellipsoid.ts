import { Ellipsoid } from './Ellipsoid';


export class Clarke1866Ellipsoid extends Ellipsoid {
  public constructor () {
    super( { name: 'Clarke 1866', semiMajorAxis: 6378206.4, inverseFlattening: 294.978698213898 } );
  }
}
