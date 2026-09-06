export type DMSDirection = 'N' | 'S' | 'E' | 'W';


export class DMS {
  public constructor( degrees: number, minutes: number, seconds: number, dir: DMSDirection ) {
    if ( ! Number.isInteger( degrees ) || degrees < 0 )
      throw new RangeError( 'Degrees must be a non-negative integer' );

    if ( ! Number.isInteger( minutes ) || minutes < 0 || minutes >= 60 )
      throw new RangeError( 'Minutes must be between 0 and 59' );

    if ( ! Number.isFinite( seconds ) || seconds < 0 || seconds >= 60 )
      throw new RangeError( 'Seconds must be between 0 and 60' );
  }
}
