import { deg2Rad } from '../utils/math';


export type DMSDirection = 'N' | 'S' | 'E' | 'W';

interface StringOptions {
  precision?: number;
}


export class DMS {
  public readonly degrees: number;
  public readonly minutes: number;
  public readonly seconds: number;
  public readonly direction: DMSDirection;

  public constructor ( degrees: number, minutes: number, seconds: number, direction: DMSDirection ) {
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

  public clone () : DMS {
    return new DMS( this.degrees, this.minutes, this.seconds, this.direction );
  }

  public equals ( other: DMS ) : boolean {
    return this.degrees === other.degrees && this.minutes === other.minutes &&
      this.seconds === other.seconds && this.direction === other.direction;
  }

  public toDecimal () : number {
    const value = this.degrees + this.minutes / 60 + this.seconds / 3600;
    return this.direction === 'S' || this.direction === 'W' ? -value : value;
  }

  public toRadians () : number {
    return deg2Rad( this.toDecimal() );
  }

  public toString ( { precision = 2 }: StringOptions = {} ) : string {
    const factor = 10 ** precision;
    let sec = Math.round( this.seconds * factor ) / factor;
    let min = Math.floor( this.minutes ), deg = Math.floor( this.degrees );

    if ( sec >= 60 ) sec = 0, min++;
    if ( min >= 60 ) min = 0, deg++;

    return `${ deg }° ${ min }′ ${ sec }″ ${ this.direction }`;
  }

  public static fromDecimal ( value: number, direction: DMSDirection ) : DMS {
    if ( ! Number.isFinite( value ) )
      throw new TypeError( 'Value must be a finite number' );

    const max = direction === 'N' || direction === 'S' ? 90 : 180;
    const abs = Math.abs( value );

    if ( abs > max )
      throw new RangeError( `Value must be between -${ max } and ${ max } degrees` );

    return new DMS(
      Math.floor( abs ), Math.floor( ( abs % 1 ) * 60 ),
      Math.round( ( ( abs % 1 ) * 60 % 1 ) * 60 ), direction
    );
  }
}
