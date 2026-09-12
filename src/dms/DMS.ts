export type Direction = 'north' | 'east' | 'south' | 'west';


export class DMS {
  public readonly value: number;
  public readonly direction: Direction | null;
  public readonly degrees: number;
  public readonly minutes: number;
  public readonly seconds: number;
}
