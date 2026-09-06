import { DMS } from './DMS';
import { Latitude } from './Latitude';
import { Longitude } from './Longitude';


interface StringOptions {
  precision?: number;
  lang?: string;
  showUnit?: boolean;
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

  public toDMS () : [ DMS, DMS ] {
    return [ DMS.fromLatitude( this.latitude.value ), DMS.fromLongitude( this.longitude.value ) ];
  }

  public toString ( { delimiter, ...o }: StringOptions = {} ) : string {
    return [ this.latitude.toString( o ), this.longitude.toString( o ) ].join( delimiter ?? ';' );
  }

  public static fromDegrees ( latitude: number, longitude: number ) : Coordinate {
    return new Coordinate( new Latitude( latitude ), new Longitude( longitude ) );
  }

  public static fromDMS ( latitude: DMS, longitude: DMS ) : Coordinate {
    if ( latitude.direction !== 'N' && latitude.direction !== 'S' )
      throw new TypeError( 'Latitude must use N or S direction' );

    if ( longitude.direction !== 'E' && longitude.direction !== 'W' )
      throw new TypeError( 'Longitude must use E or W direction' );

    return Coordinate.fromDegrees( latitude.toDecimal(), longitude.toDecimal() );
  }
}
