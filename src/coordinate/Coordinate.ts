import { Latitude } from './Latitude';
import { Longitude } from './Longitude';


export class Coordinate {
  public constructor (
    public readonly latitude: Latitude,
    public readonly longitude: Longitude
  ) {}

  public clone () : Coordinate {
    return new Coordinate( this.latitude, this.longitude );
  }

  public equals ( other: Coordinate ) : boolean {
    return this.latitude.value === other.latitude.value &&
      this.longitude.value === other.longitude.value;
  }
}
