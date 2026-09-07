import { Projection } from './Projection';


export class SphericalMercator extends Projection {
  public constructor (
    public readonly radius: number = 6378137,
    public readonly centralMeridian: number = 0,
    public readonly scaleFactor: number = 1,
    public readonly falseEasting: number = 0,
    public readonly falseNorthing: number = 0
  ) {
    super( 'Spherical Mercator' );
  }
}
