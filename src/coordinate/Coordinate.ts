import { Latitude } from './Latitude';
import { Longitude } from './Longitude';


export class Coordinate {
  public readonly latitude: Latitude;
  public readonly longitude: Longitude;

  public constructor ( latitude: Latitude, longitude: Longitude ) {
    this.latitude = latitude;
    this.longitude = longitude;
  }
}
