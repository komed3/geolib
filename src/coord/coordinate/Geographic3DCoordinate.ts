import { Coordinate } from '../../base/Coordinate';
import { Geographic3DSystem } from '../system/Geographic3DSystem';
import { Height } from '../value/Height';
import { Latitude } from '../value/Latitude';
import { Longitude } from '../value/Longitude';


export class Geographic3DCoordinate extends Coordinate {
  public constructor (
    longitude: number | Longitude, latitude: number | Latitude, height: number | Height,
    system: Geographic3DSystem = new Geographic3DSystem()
  ) {
    super( system, [
      longitude instanceof Longitude ? longitude : new Longitude( longitude ),
      latitude instanceof Latitude ? latitude : new Latitude( latitude ),
      height instanceof Height ? height : new Height( height )
    ] );
  }

  public get longitude () : Longitude {
    return this.values[ 0 ] as Longitude;
  }

  public get latitude () : Latitude {
    return this.values[ 1 ] as Latitude;
  }

  public get height () : Height {
    return this.values[ 2 ] as Height;
  }
}
