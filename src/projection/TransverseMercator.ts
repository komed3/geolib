import type { Ellipsoid } from '../crs/Ellipsoid';
import { Projection } from './Projection';


export class TransverseMercator extends Projection {
  public constructor (
    public readonly ellipsoid: Ellipsoid,
    public readonly centralMeridian: number,
    public readonly latitudeOfOrigin: number = 0,
    public readonly scaleFactor: number = 1,
    public readonly falseEasting: number = 0,
    public readonly falseNorthing: number = 0
  ) {
    super( 'Transverse Mercator' );
  }
}
