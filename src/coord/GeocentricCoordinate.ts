import { GeocentricSystem } from '../system/GeocentricSystem';
import { GeocentricX } from '../value/GeocentricX';
import { GeocentricY } from '../value/GeocentricY';
import { GeocentricZ } from '../value/GeocentricZ';
import { Coordinate } from './Coordinate';


export class GeocentricCoordinate extends Coordinate {
  public constructor (
    x: number | GeocentricX, y: number | GeocentricY, z: number | GeocentricZ,
    system: GeocentricSystem = new GeocentricSystem()
  ) {
    super( system, [
      x instanceof GeocentricX ? x : new GeocentricX( x ),
      y instanceof GeocentricY ? y : new GeocentricY( y ),
      z instanceof GeocentricZ ? z : new GeocentricZ( z )
    ] );
  }

  public get x () : GeocentricX {
    return this.values[ 0 ] as GeocentricX;
  }

  public get y () : GeocentricY {
    return this.values[ 1 ] as GeocentricY;
  }

  public get z () : GeocentricZ {
    return this.values[ 2 ] as GeocentricZ;
  }
}
