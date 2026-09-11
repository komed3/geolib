import { Projected2DSystem } from '../system/Projected2DSystem';
import { Easting } from '../value/Easting';
import { Northing } from '../value/Northing';
import { Coordinate } from './Coordinate';


export class Projected2DCoordinate extends Coordinate {
  public constructor (
    easting: number | Easting, northing: number | Northing,
    system: Projected2DSystem = new Projected2DSystem()
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
