export type Direction = 'north' | 'east' | 'south' | 'west';

export type DMSTuple = [
  degrees: number,
  minutes: number,
  seconds: number,
  direction?: string
];


export class DMS {
  public readonly value: number;
  public readonly direction: Direction | null;
  public readonly degrees: number;
  public readonly minutes: number;
  public readonly seconds: number;

  private carry ( [ degrees, minutes, seconds ]: DMSTuple ) : DMSTuple {
    minutes += Math.floor( seconds / 60 ), seconds %= 60;
    degrees += Math.floor( minutes / 60 ), minutes %= 60;

    return [ degrees, minutes, seconds ];
  }
}
