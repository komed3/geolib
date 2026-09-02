import { Coordinate } from '../abstract/Coordinate';


export class GeographicCoordinate extends Coordinate {
  public override readonly name = 'geographic';
  public readonly latitude: number;
  public readonly longitude: number;
  public readonly altitude: number;

  public constructor ( latitude: number, longitude: number, altitude: number = 0 ) {
    super( 'geographic', 3 );

    if ( ! Number.isFinite( latitude ) || ! Number.isFinite( longitude ) || ! Number.isFinite( altitude ) )
      throw new TypeError( 'latitude, longitude and altitude must be finite numbers' );

    if ( latitude < -90 || latitude > 90 )
      throw new RangeError( 'latitude must be between -90 and 90 degrees' );

    if ( longitude < -180 || longitude > 180 )
      throw new RangeError( 'longitude must be between -180 and 180 degrees' );

    this.latitude = latitude;
    this.longitude = longitude;
    this.altitude = altitude;
  }

  public clone () : GeographicCoordinate {
    return new GeographicCoordinate( this.latitude, this.longitude, this.altitude );
  }

  public toJSON () : Record< string, unknown > {
    return { system: this.name, latitude: this.latitude, longitude: this.longitude, altitude: this.altitude };
  }
}
