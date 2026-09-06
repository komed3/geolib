import { Latitude } from './Latitude';
import { Longitude } from './Longitude';


interface StringOptions {
  precision?: number;
  lang?: string;
  delimiter?: string;
}


export class Coordinate {
  public constructor (
    public readonly latitude: Latitude,
    public readonly longitude: Longitude
  ) {}

  public toTuple () : [ number, number ] {
    return [ this.latitude.value, this.longitude.value ];
  }

  public toRadians () : [ number, number ] {
    return [ this.latitude.toRadians(), this.longitude.toRadians() ];
  }

  public toString ( { precision, lang, delimiter }: StringOptions = {} ) : string {
    //
  }

  public static fromDegrees ( latitude: number, longitude: number ) : Coordinate {
    return new Coordinate( new Latitude( latitude ), new Longitude( longitude ) );
  }
}
