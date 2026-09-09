import { DIRECTION_MAP, type TAngleStringOptions, type TDirection } from './Angle';


export interface TDMSOptions {
  degrees: number;
  minutes: number;
  seconds: number;
  direction: TDirection | null;
}


export class DMS {
  public constructor (
    public readonly degrees: number,
    public readonly minutes: number,
    public readonly seconds: number,
    public readonly direction: TDirection | null = null
  ) {}

  public toDecimal () : number {
    return ( this.degrees < 0 ? -1 : 1 ) * (
      Math.abs( this.degrees ) + this.minutes / 60 + this.seconds / 3600
    );
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
    locale = 'en', precision = 2, delimiter = ' ',
    showUnit = true, dirMap = DIRECTION_MAP, notation = 'directional'
  }: TAngleStringOptions = {} ) : string {
    const factor = 10 ** precision;
    let sec = Math.round( this.seconds * factor ) / factor;
    let min = this.minutes, deg = this.degrees;

    if ( sec >= 60 ) sec = 0, min++;
    if ( min >= 60 ) min = 0, deg++;

    const d = deg.toLocaleString( locale, { maximumFractionDigits: 0 } );
    const m = min.toLocaleString( locale, { minimumFractionDigits: 0, maximumFractionDigits: 0 } );
    const s = sec.toLocaleString( locale, { minimumFractionDigits: 0, maximumFractionDigits: precision } );

    const value = showUnit
      ? `${ d }°${ delimiter }${ m }′${ delimiter }${ s }″`
      : `${ d }${ delimiter }${ m }${ delimiter }${ s }`;

    if ( notation === 'signed' || this.direction === null )
      return this.degrees < 0 ? `-${ value }` : value;

    return `${ value }${ delimiter }${ dirMap[ this.direction ] }`;
  }
}
