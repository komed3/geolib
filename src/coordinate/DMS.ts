export type DMSDirection = 'N' | 'S' | 'E' | 'W';

interface StringOptions {
  precision?: number;
}


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

    if ( ! [ 'N', 'S', 'E', 'W' ].includes( direction ) )
      throw new RangeError( 'Direction must be N, S, E or W' );

    const maxDegrees = direction === 'N' || direction === 'S' ? 90 : 180;

    if ( degrees > maxDegrees )
      throw new RangeError( `Degrees must be between 0 and ${ maxDegrees }` );

    if ( degrees === maxDegrees && ( minutes > 0 || seconds > 0 ) )
      throw new RangeError( `Degrees cannot exceed ${ maxDegrees }` );

    this.degrees = degrees;
    this.minutes = minutes;
    this.seconds = seconds;
    this.direction = direction;
  }

  public toDecimal () : number {
    const value = this.degrees + this.minutes / 60 + this.seconds / 3600;
    return this.direction === 'S' || this.direction === 'W' ? -value : value;
  }

  public toRadians () : number {
    return this.toDecimal() * Math.PI / 180;
  }

  public toString ( { precision = 2 }: StringOptions = {} ) : string {
    return `${ this.degrees }° ${ this.minutes }′ ${ this.seconds.toFixed( precision ) }″ ${ this.direction }`;
  }

  public static fromDecimal ( value: number, direction: DMSDirection ) : DMS {
    const abs = Math.abs( value );
    const degrees = Math.floor( abs );
    const minutesValue = ( abs - degrees ) * 60;
    const minutes = Math.floor( minutesValue );
    const seconds = ( minutesValue - minutes ) * 60;

    return new DMS( degrees, minutes, seconds, direction );
  }
}
