export type Direction = 'north' | 'east' | 'south' | 'west';

export type DMSTuple = [
  degrees: number,
  minutes: number,
  seconds: number,
  direction?: string
];


const DMS_SEC_PRECISION = 1e10;


export class DMS {
  public readonly value: number;
  public readonly direction?: Direction;
  public readonly degrees: number;
  public readonly minutes: number;
  public readonly seconds: number;

  private carry ( [ degrees, minutes, seconds ]: DMSTuple ) : DMSTuple {
    minutes += Math.floor( seconds / 60 ), seconds %= 60;
    degrees += Math.floor( minutes / 60 ), minutes %= 60;

    return [ degrees, minutes, seconds ];
  }

  public constructor ( degrees: number, minutes: number = 0, seconds: number = 0, direction?: Direction ) {
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
}
