import type { Coordinate } from '../coord';


export class BBox< T extends Coordinate = Coordinate > {
  public readonly min: T;
  public readonly max: T;
}
