import { DMS } from './DMS';
import { Latitude } from './Latitude';
import { Longitude } from './Longitude';


export type Tuple< T = number > = [
  latitude: T,
  longitude: T
];


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

  public toTuple () : Tuple {
    return [
      this.latitude.value,
      this.longitude.value
    ];
  }

  public toRadians () : Tuple {
    return [
      this.latitude.toRadians(),
      this.longitude.toRadians()
    ];
  }

  public toDMS () : Tuple< DMS > {
    return [
      DMS.fromLatitude( this.latitude.value ),
      DMS.fromLongitude( this.longitude.value )
    ];
  }
}
