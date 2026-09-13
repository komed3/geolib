import type { Coordinate } from '../coord';


export interface BBoxOptions< T extends Coordinate = Coordinate > {
  min: T;
  max: T;
}


export class BBox< T extends Coordinate = Coordinate > {
  public readonly min: T;
  public readonly max: T;

  public constructor ( { min, max }: BBoxOptions< T > ) {
    if ( min.system.equals( max.system ) === false )
      throw new TypeError( 'Bounding box system mismatch' );

    this.min = min, this.max = max;
  }
}
