import { rad2Deg } from '../utils/math';
import { DMS } from './DMS';
import { Latitude } from './Latitude';
import { Longitude } from './Longitude';


export type Tuple< T = number > = [
  latitude: T,
  longitude: T
];

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

  public clone () : Coordinate {
    return new Coordinate( this.latitude, this.longitude );
  }

  public equals ( { latitude, longitude }: Coordinate ) : boolean {
    return this.latitude.value === latitude.value && this.longitude.value === longitude.value;
  }

  public toTuple () : Tuple {
    return [ this.latitude.value, this.longitude.value ];
  }

  public toRadians () : Tuple {
    return [ this.latitude.toRadians(), this.longitude.toRadians() ];
  }

  public toDMS () : Tuple< DMS > {
    return [
      DMS.fromLatitude( this.latitude.value ),
      DMS.fromLongitude( this.longitude.value )
    ];
  }

  public toString ( { delimiter = ';', ...options }: StringOptions = {} ) : string {
    return [
      this.latitude.toString( options ),
      this.longitude.toString( options )
    ].join( delimiter );
  }

  public static fromDegrees ( latitude: number, longitude: number ) : Coordinate {
    return new Coordinate( new Latitude( latitude ), new Longitude( longitude ) );
  }

  public static fromRadians ( latitude: number, longitude: number ) : Coordinate {
    return new Coordinate(
      new Latitude( rad2Deg( latitude ) ),
      new Longitude( rad2Deg( longitude ) )
    );
  }

  public static fromTuple ( [ latitude, longitude ]: Tuple ) : Coordinate {
    return new Coordinate( new Latitude( latitude ), new Longitude( longitude ) );
  }

  public static fromDMS ( latitude: DMS, longitude: DMS ) : Coordinate {
    if ( ! [ 'N', 'S' ].includes( latitude.direction ) )
      throw new TypeError( 'Latitude must use N or S direction' );

    if ( ! [ 'E', 'W' ].includes( longitude.direction ) )
      throw new TypeError( 'Longitude must use E or W direction' );

    return Coordinate.fromDegrees( latitude.toDecimal(), longitude.toDecimal() );
  }
}
