import { Coordinate } from '../../base/Coordinate';
import type { System } from '../../base/System';
import { Projected3DSystem } from '../system/Projected3DSystem';
import { Easting } from '../value/Easting';
import { Height } from '../value/Height';
import { Northing } from '../value/Northing';


export class Projected3DCoordinate extends Coordinate {
  public constructor (
    easting: number | Easting, northing: number | Northing, height: number | Height,
    system: System = new Projected3DSystem()
  ) {
    super( system, [
      easting instanceof Easting ? easting : new Easting( easting ),
      northing instanceof Northing ? northing : new Northing( northing ),
      height instanceof Height ? height : new Height( height )
    ] );
  }

  public get easting () : Easting {
    return this.values[ 0 ] as Easting;
  }

  public get northing () : Northing {
    return this.values[ 1 ] as Northing;
  }

  public get height () : Height {
    return this.values[ 2 ] as Height;
  }
}
