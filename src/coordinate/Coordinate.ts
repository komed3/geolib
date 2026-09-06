import { Latitude } from './Latitude';
import { Longitude } from './Longitude';


export class Coordinate {
  public constructor (
    public readonly latitude: Latitude,
    public readonly longitude: Longitude
  ) {}
}
