import type { TDirection, TDirectionStringOptions } from './Direction';
import { DIRECTION_MAP_EN } from './Direction';


export interface TDMSOptions {
  degrees: number;
  minutes?: number;
  seconds?: number;
  direction?: TDirection | null;
}


const DMS_REGEX = /^\s*([+-]?\d+(?:\.\d+)?)(?:\s*°)?(?:\s*(\d+(?:\.\d+)?))?(?:\s*[′'])?(?:\s*(\d+(?:\.\d+)?))?(?:\s*[″"])?(?:\s*([NSEW]))?\s*$/i;


export class DMS {
  public readonly degrees: number;
  public readonly minutes: number;
  public readonly seconds: number;
  public readonly direction: TDirection | null;

  private static normalize ( { degrees, minutes, seconds, direction }: TDMSOptions ) : Required< TDMSOptions > {
    const value = Math.abs( degrees ) + Math.abs( minutes ?? 0 ) / 60 + Math.abs( seconds ?? 0 ) / 3600;
    const sign = degrees < 0 ? -1 : 1;

    let deg = Math.floor( value ), mVal = ( value - deg ) * 60;
    let min = Math.floor( mVal ), sec = ( mVal - min ) * 60;

    if ( sec >= 60 ) sec = 0, min++;
    if ( min >= 60 ) min = 0, deg++;

    if ( direction != null ) deg = Math.abs( deg );
    else if ( sign < 0 ) deg = -deg;

    return { degrees: deg, minutes: min, seconds: sec, direction: direction ?? null };
  }

  private static parseDirection ( value?: string ) : TDirection | null {
    if ( ! value ) return null;

    switch ( value.toUpperCase() ) {
      case 'N': return 'north';
      case 'E': return 'east';
      case 'S': return 'south';
      case 'W': return 'west';
      default: throw new SyntaxError( 'Invalid DMS direction' );
    }
  }

  public constructor ( degrees: number, minutes: number = 0, seconds: number = 0, direction: TDirection | null = null ) {
    const normalized = DMS.normalize( { degrees, minutes, seconds, direction } );

    this.degrees = normalized.degrees;
    this.minutes = normalized.minutes;
    this.seconds = normalized.seconds;
    this.direction = normalized.direction;
  }

  public toDecimal () : number {
    const value = this.degrees + this.minutes / 60 + this.seconds / 3600;
    if ( this.direction === 'south' || this.direction === 'west' ) return -value;
    return value;
  }

  public equals ( { degrees, minutes, seconds, direction }: DMS ) : boolean {
    return this.degrees === degrees && this.minutes === minutes &&
      this.seconds === seconds && this.direction === direction;
  }

  public clone () : DMS {
    return new DMS( this.degrees, this.minutes, this.seconds, this.direction );
  }

  public toJSON () : TDMSOptions {
    return {
      degrees: this.degrees, minutes: this.minutes, seconds: this.seconds,
      direction: this.direction
    };
  }

  public toString ( {
    locale = 'en', precision = 2, delimiter = ' ', showUnit = true,
    dirMap = DIRECTION_MAP_EN, notation = 'directional'
  }: TDirectionStringOptions = {} ) : string {
    const factor = 10 ** precision;
    let sec = Math.round( this.seconds * factor ) / factor;
    let min = this.minutes, deg = this.degrees;

    if ( sec >= 60 ) sec = 0, min++;
    if ( min >= 60 ) min = 0, deg++;

    const d = deg.toLocaleString( locale, { minimumFractionDigits: 0, maximumFractionDigits: 0 } );
    const m = min.toLocaleString( locale, { minimumFractionDigits: 0, maximumFractionDigits: 0 } );
    const s = sec.toLocaleString( locale, { minimumFractionDigits: 0, maximumFractionDigits: precision } );

    const value = showUnit
      ? `${ d }°${ delimiter }${ m }′${ delimiter }${ s }″`
      : `${ d }${ delimiter }${ m }${ delimiter }${ s }`;

    if ( notation === 'signed' || this.direction === null ) return value;
    return `${ value }${ delimiter }${ dirMap[ this.direction ] }`;
  }

  public static fromDecimal ( value: number, direction: TDirection | null = null ) : DMS {
    if ( ! Number.isFinite( value ) ) throw new RangeError( 'Invalid decimal value' );
    return new DMS( value, 0, 0, direction );
  }

  public static fromObject ( { degrees, minutes, seconds, direction }: TDMSOptions ) : DMS {
    return new DMS( degrees, minutes, seconds, direction );
  }

  public static parse ( value: string ) : DMS {
    const match = value.match( DMS_REGEX );
    if ( ! match ) throw new SyntaxError( 'Invalid DMS value' );

    const deg = Number( match[ 1 ] ), min = Number( match[ 2 ] ?? 0 ), sec = Number( match[ 3 ] ?? 0 );
    const dir = DMS.parseDirection( match[ 4 ] );

    if ( dir !== null && deg < 0 ) throw new SyntaxError( 'Invalid DMS value: direction conflicts with sign' );
    return new DMS( Math.abs( deg ), min, sec, dir );
  }
}
