import { Coordinate } from '../abstract/Coordinate';


export class GeographicCoordinate extends Coordinate {
  public override readonly name = 'geographic';
  public readonly lat: number;
  public readonly lon: number;
  public readonly alt: number;

  public constructor ( latitude: number, longitude: number, altitude: number = 0 ) {
    super( 'geographic', 3 );

    if ( ! Number.isFinite( latitude ) || ! Number.isFinite( longitude ) || ! Number.isFinite( altitude ) )
      throw new TypeError( 'latitude, longitude and altitude must be finite numbers' );

    if ( latitude < -90 || latitude > 90 )
      throw new RangeError( 'latitude must be between -90 and 90 degrees' );

    if ( longitude < -180 || longitude > 180 )
      throw new RangeError( 'longitude must be between -180 and 180 degrees' );

    this.lat = latitude;
    this.lon = longitude;
    this.alt = altitude;
  }

  public clone () : GeographicCoordinate {
    return new GeographicCoordinate( this.lat, this.lon, this.alt );
  }

  public toJSON () : Record< string, unknown > {
    return { system: this.name, latitude: this.lat, longitude: this.lon, altitude: this.alt };
  }
}
