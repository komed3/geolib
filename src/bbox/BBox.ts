import type { Coordinate } from '../coord';
import type { System } from '../system';


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

  public get system () : System {
    return this.min.system;
  }

  public get dimension () : number {
    return this.min.dimension;
  }
}
