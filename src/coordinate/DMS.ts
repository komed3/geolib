export type DMSDirection = 'N' | 'S' | 'E' | 'W';


export class DMS {
  public readonly degrees: number;
  public readonly minutes: number;
  public readonly seconds: number;
  public readonly direction: DMSDirection;

  public constructor( degrees: number, minutes: number, seconds: number, direction: DMSDirection ) {
    if ( ! Number.isInteger( degrees ) || degrees < 0 )
      throw new RangeError( 'Degrees must be a non-negative integer' );

    if ( ! Number.isInteger( minutes ) || minutes < 0 || minutes >= 60 )
      throw new RangeError( 'Minutes must be between 0 and 59' );

    if ( ! Number.isFinite( seconds ) || seconds < 0 || seconds >= 60 )
      throw new RangeError( 'Seconds must be between 0 and 60' );

    this.degrees = degrees;
    this.minutes = minutes;
    this.seconds = seconds;
    this.direction = direction;
  }
}
