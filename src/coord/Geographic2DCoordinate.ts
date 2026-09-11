import { Geographic2DSystem } from '../system/Geographic2DSystem';
import { Latitude } from '../value/Latitude';
import { Longitude } from '../value/Longitude';
import { Coordinate } from './Coordinate';


export class Geographic2DCoordinate extends Coordinate {
  public constructor (
    longitude: number | Longitude, latitude: number | Latitude,
    system: Geographic2DSystem = new Geographic2DSystem()
  ) {
    super( system, [
      longitude instanceof Longitude ? longitude : new Longitude( longitude ),
      latitude instanceof Latitude ? latitude : new Latitude( latitude )
    ] );
  }

  public get longitude () : Longitude {
    return this.values[ 0 ] as Longitude;
  }

  public get latitude () : Latitude {
    return this.values[ 1 ] as Latitude;
  }
}
