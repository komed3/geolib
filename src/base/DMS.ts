export type TDirection = 'north' | 'east' | 'south' | 'west';
export type TDMSFormat = 'dd' | 'dm' | 'dms';
export type TNotation = 'signed' | 'directional';

export type TDirectionMap = Partial< Record< TDirection, string > >;

export type TDMS = [
  degrees: number,
  minutes: number,
  seconds: number
];

export interface TDMSOptions {
  degrees: number;
  minutes?: number;
  seconds?: number;
  direction?: TDirection | null;
}

export interface TDMSStringOptions {
  format?: TDMSFormat;
  locale?: string;
  precision?: number;
  delimiter?: string;
  showUnit?: boolean;
  dirMap?: TDirectionMap;
  notation?: TNotation;
}


export const DMS_UNIT_MAP = [ '°', '′', '″' ] as const;
export const DIRECTION_MAP_EN: TDirectionMap = { north: 'N', east: 'E', south: 'S', west: 'W' };
export const DIRECTION_MAP_DE: TDirectionMap = { north: 'N', east: 'O', south: 'S', west: 'W' };

const DMS_SEC_PRECISION = 1e10;

const DMS_REGEX = /^\s*([+-]?\d+(?:\.\d+)?)(?:\s*°)?(?:\s*(\d+(?:\.\d+)?))?(?:\s*[′'])?(?:\s*(\d+(?:\.\d+)?))?(?:\s*[″"])?(?:\s*([NSEOW]))?\s*$/i;
const DMS_DIRMAP = { N: 'north', E: 'east', O: 'east', S: 'south', W: 'west' } as const;


export class DMS {
  public readonly value: number;
  public readonly direction: TDirection | null;
  public readonly degrees: number;
  public readonly minutes: number;
  public readonly seconds: number;

  private carry ( [ degrees, minutes, seconds ]: TDMS ) : TDMS {
    minutes += Math.floor( seconds / 60 ), seconds %= 60;
    degrees += Math.floor( minutes / 60 ), minutes %= 60;

    return [ degrees, minutes, seconds ];
  };

  public constructor ( degrees: number, minutes: number = 0, seconds: number = 0, direction: TDirection | null = null ) {
    const value = degrees + minutes / 60 + seconds / 3600;

    if ( direction != null && value < 0 )
      throw new RangeError( 'DMS value has conflicting sign and direction' );

    this.value = direction === 'south' || direction === 'west' ? -value : value;
    this.direction = direction;

    const sign = value < 0 ? -1 : 1, abs = Math.abs( value );
    let deg = Math.floor( abs ), min = Math.floor( ( abs - deg ) * 60 ), sec = Math.round(
      ( abs - deg - min / 60 ) * 3600 * DMS_SEC_PRECISION
    ) / DMS_SEC_PRECISION;

    [ deg, min, sec ] = this.carry( [ deg, min, sec ] );

    this.degrees = direction != null ? deg : sign * deg;
    this.minutes = min;
    this.seconds = sec;
  }

  public equals ( { value, direction }: DMS ) : boolean {
    return this.value === value && this.direction === direction;
  }

  public clone () : DMS {
    return new DMS( this.degrees, this.minutes, this.seconds, this.direction );
  }

  public toJSON () : TDMSOptions & { value: number } {
    return {
      value: this.value, direction: this.direction, degrees: this.degrees,
      minutes: this.minutes, seconds: this.seconds
    };
  }

  public toString ( {
    format = 'dms', locale = 'en', precision = 2, delimiter = ' ', showUnit = true,
    dirMap = DIRECTION_MAP_EN, notation = 'directional'
  }: TDMSStringOptions = {} ) : string {
    const last = format === 'dd' ? 0 : format === 'dm' ? 1 : 2, factor = 10 ** precision;
    let values: TDMS = [ Math.abs( this.degrees ), this.minutes, this.seconds ];

    if ( last < 2 ) values[ 1 ] += values[ 2 ] / 60;
    if ( last < 1 ) values[ 0 ] += values[ 1 ] / 60;

    values[ last ] = Math.round( values[ last ] * factor ) / factor;
    values = this.carry( values );

    return ( notation === 'signed' || ! this.direction ? this.value < 0 ? '-' : '' : '' ) + [
      ...values.slice( 0, last + 1 ).map( ( value, i ) => value.toLocaleString( locale, {
        maximumFractionDigits: i === last ? precision : 0
      } ) + ( showUnit ? DMS_UNIT_MAP[ i ] : '' ) ),
      notation === 'directional' && this.direction ? dirMap[ this.direction ] : ''
    ].filter( Boolean ).join( delimiter );
  }

  public static fromDecimals ( value: number, direction: TDirection | null = null ) : DMS {
    return new DMS( value, 0, 0, direction );
  }

  public static fromLongitude ( value: number ) : DMS {
    return DMS.fromDecimals( Math.abs( value ), value < 0 ? 'west' : 'east' );
  }

  public static fromLatitude ( value: number ) : DMS {
    return DMS.fromDecimals( Math.abs( value ), value < 0 ? 'south' : 'north' );
  }

  public static fromObject ( { degrees, minutes, seconds, direction }: TDMSOptions ) : DMS {
    return new DMS( degrees, minutes, seconds, direction );
  }

  public static parse ( value: string ) : DMS {
    const match = value.match( DMS_REGEX );
    if ( ! match ) throw new SyntaxError( 'Invalid DMS value' );

    const direction = DMS_DIRMAP[ match[ 4 ]?.toUpperCase() as keyof typeof DMS_DIRMAP ];
    if ( ! direction ) throw new SyntaxError( 'Invalid DMS direction' );

    return new DMS(
      Number( match[ 1 ] ), Number( match[ 2 ] ?? 0 ),
      Number( match[ 3 ] ?? 0), direction
    );
  }
}
