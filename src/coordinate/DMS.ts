export type DMSDirection = 'N' | 'S' | 'E' | 'W';


export class DMS {
  public constructor( degrees: number, minutes: number, seconds: number, dir: DMSDirection ) {
    if ( ! Number.isInteger( degrees ) || degrees < 0 )
      throw new RangeError( 'Degrees must be a non-negative integer' );
  }
}
