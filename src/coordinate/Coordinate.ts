import { Latitude } from './Latitude';
import { Longitude } from './Longitude';


export class Coordinate {
  public constructor (
    public readonly latitude: Latitude,
    public readonly longitude: Longitude
  ) {}

  public toRadians () : [ number, number ] {
    return [
      this.latitude.toRadians(),
      this.longitude.toRadians()
    ]
  }

  public static fromDegrees ( latitude: number, longitude: number ) : Coordinate {
    return new Coordinate( new Latitude( latitude ), new Longitude( longitude ) );
  }
}
