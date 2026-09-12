import type { Latitude, Longitude, Longitude360 } from '../value';


export type DMSDirection = 'north' | 'east' | 'south' | 'west';
export type DMSFormat = 'dd' | 'dm' | 'dms';
export type DMSNotation = 'signed' | 'directional';

export type DMSDirectionMap = Partial< Record< DMSDirection, string > >;

export type DMSUnitMap = [
  degrees: string,
  minutes: string,
  seconds: string
];

export type DMSTuple = [
  degrees: number,
  minutes: number,
  seconds: number,
  direction?: DMSDirection
];

export interface DMSObject {
  degrees: number;
  minutes?: number;
  seconds?: number;
  direction?: DMSDirection
}

export interface DMSStringOptions {
  format?: DMSFormat;
  notation?: DMSNotation;
  maxPrecision?: number;
  minPrecision?: number;
  locale?: string;
  delimiter?: string;
  displayUnit?: boolean;
  directions?: DMSDirectionMap;
  units?: DMSUnitMap;
}


export const DMS_UNITMAP: DMSUnitMap = [ '°', '′', '″' ] as const;
export const DMS_DIRMAP_EN: DMSDirectionMap = { north: 'N', east: 'E', south: 'S', west: 'W' };
export const DMS_DIRMAP_DE: DMSDirectionMap = { north: 'N', east: 'O', south: 'S', west: 'W' };

const DMS_SEC_PRECISION = 1e10;

const DMS_REGEX = /^\s*([+-]?\d+(?:\.\d+)?)(?:\s*°)?(?:\s*(\d+(?:\.\d+)?))?(?:\s*[′'])?(?:\s*(\d+(?:\.\d+)?))?(?:\s*[″"])?(?:\s*([NSEOW]))?\s*$/i;
const DMS_DIRMAP = { N: 'north', E: 'east', O: 'east', S: 'south', W: 'west' } as const;


const v = ( value: number | Latitude | Longitude | Longitude360 ) : number =>
  typeof value === 'number' ? value : value.value;


export class DMS {
  public readonly value: number;
  public readonly direction?: DMSDirection;
  public readonly degrees: number;
  public readonly minutes: number;
  public readonly seconds: number;

  private carry ( [ degrees, minutes, seconds ]: DMSTuple ) : DMSTuple {
    minutes += Math.floor( seconds / 60 ), seconds %= 60;
    degrees += Math.floor( minutes / 60 ), minutes %= 60;

    return [ degrees, minutes, seconds ];
  }

  public constructor ( degrees: number, minutes: number = 0, seconds: number = 0, direction?: DMSDirection ) {
    const value = degrees + minutes / 60 + seconds / 3600;

    if ( direction !== undefined && value < 0 )
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

  public toTuple () : DMSTuple {
    return [ this.degrees, this.minutes, this.seconds, this.direction ];
  }

  public toJSON () : DMSObject & { value: number } {
    return {
      value: this.value, direction: this.direction, degrees: this.degrees,
      minutes: this.minutes, seconds: this.seconds
    };
  }

  public toString ( {
    format = 'dms', notation = 'directional', maxPrecision = 2, minPrecision = 0, locale = 'en',
    delimiter = ' ', displayUnit = true, units = DMS_UNITMAP, directions = DMS_DIRMAP_EN
  }: DMSStringOptions = {} ) : string {
    const last = format === 'dd' ? 0 : format === 'dm' ? 1 : 2, factor = 10 ** maxPrecision;
    let values: DMSTuple = [ Math.abs( this.degrees ), this.minutes, this.seconds ];

    if ( last < 2 ) values[ 1 ] += values[ 2 ] / 60;
    if ( last < 1 ) values[ 0 ] += values[ 1 ] / 60;

    values[ last ] = Math.round( values[ last ] * factor ) / factor;
    values = this.carry( values );

    return ( notation === 'signed' || ! this.direction ? this.value < 0 ? '-' : '' : '' ) + [
      ...values.slice( 0, last + 1 ).map( ( value, i ) => value!.toLocaleString( locale, {
        maximumFractionDigits: i === last ? maxPrecision : 0,
        minimumFractionDigits: i === last ? minPrecision : 0
      } ) + ( displayUnit ? units[ i ] : '' ) ),
      notation === 'directional' && this.direction ? directions[ this.direction ] : ''
    ].filter( Boolean ).join( delimiter );
  }

  public static fromDecimals ( value: number | Latitude | Longitude | Longitude360, direction?: DMSDirection ) : DMS {
    return new DMS( v( value ), 0, 0, direction );
  }

  public static fromLongitude ( value: number | Longitude | Longitude360 ) : DMS {
    const parsed = v( value );
    return DMS.fromDecimals( Math.abs( parsed ), parsed < 0 ? 'west' : 'east' );
  }

  public static fromLatitude ( value: number | Latitude ) : DMS {
    const parsed = v( value );
    return DMS.fromDecimals( Math.abs( parsed ), parsed < 0 ? 'south' : 'north' );
  }

  public static fromTuple ( [ degrees, minutes, seconds, direction ]: DMSTuple ) : DMS {
    return new DMS( degrees, minutes, seconds, direction );
  }

  public static fromObject ( { degrees, minutes, seconds, direction }: DMSObject ) : DMS {
    return new DMS( degrees, minutes, seconds, direction );
  }

  public static parse ( value: string ) : DMS {
    const match = value.match( DMS_REGEX );
    if ( ! match ) throw new SyntaxError( 'Invalid DMS value' );

    return new DMS(
      Number( match[ 1 ] ), Number( match[ 2 ] ?? 0 ), Number( match[ 3 ] ?? 0 ),
      DMS_DIRMAP[ match[ 4 ]?.toUpperCase() as keyof typeof DMS_DIRMAP ]
    );
  }
}
