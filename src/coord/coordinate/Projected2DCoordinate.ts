import { Coordinate } from '../../base/Coordinate';
import type { System } from '../../base/System';
import { Projected2DSystem } from '../system/Projected2DSystem';
import { Easting } from '../value/Easting';
import { Northing } from '../value/Northing';


export class Projected2DCoordinate extends Coordinate {
  public constructor (
    easting: number | Easting, northing: number | Northing,
    system: System = new Projected2DSystem()
  ) {
    super( system, [
      easting instanceof Easting ? easting : new Easting( easting ),
      northing instanceof Northing ? northing : new Northing( northing )
    ] );
  }

  public get easting () : Easting {
    return this.values[ 0 ] as Easting;
  }

  public get northing () : Northing {
    return this.values[ 1 ] as Northing;
  }
}
