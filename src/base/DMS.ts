export type TDirection = 'north' | 'east' | 'south' | 'west';
export type TDMSFormat = 'dd' | 'dm' | 'dms';
export type TNotation = 'signed' | 'directional';

export type TDirectionMap = Partial< Record< TDirection, string > >;

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


export const DIRECTION_MAP_EN: TDirectionMap = { north: 'N', east: 'E', south: 'S', west: 'W' };
export const DIRECTION_MAP_DE: TDirectionMap = { north: 'N', east: 'O', south: 'S', west: 'W' };

const DMS_REGEX = /^\s*([+-]?\d+(?:\.\d+)?)(?:\s*°)?(?:\s*(\d+(?:\.\d+)?))?(?:\s*[′'])?(?:\s*(\d+(?:\.\d+)?))?(?:\s*[″"])?(?:\s*([NSEW]))?\s*$/i;


export class DMS {
  public readonly value: number;
  public readonly direction: TDirection | null;
  public readonly degrees: number;
  public readonly minutes: number;
  public readonly seconds: number;

  public constructor ( degrees: number, minutes: number = 0, seconds: number = 0, direction: TDirection | null = null ) {
    const value = degrees + minutes / 60 + seconds / 3600;

    if ( direction != null && value < 0 )
      throw new RangeError( 'DMS value has conflicting sign and direction' );

    this.value = direction === 'south' || direction === 'west' ? -value : value;
    this.direction = direction;

    const sign = value < 0 ? -1 : 1, abs = Math.abs( value );

    let deg = Math.floor( abs ), min = Math.floor( ( abs - deg ) * 60 ),
        sec = Math.round( ( abs - deg - min / 60 ) * 3600 );

    if ( sec >= 60 ) sec = 0, min++;
    if ( min >= 60 ) min = 0, deg++;

    this.degrees = direction != null ? deg : sign * deg;
    this.minutes = min;
    this.seconds = sec;
  }

  public equals ( { value, direction }: DMS ) : boolean {
    return this.value === value && this.direction === direction;
  }

  public clone () : DMS {
    return new DMS( this.value, 0, 0, this.direction );
  }
}
