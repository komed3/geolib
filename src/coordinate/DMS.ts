export type DMSDirection = 'N' | 'S' | 'E' | 'W';

interface StringOptions {
  precision?: number;
}


export class DMS {
  public readonly degrees: number;
  public readonly minutes: number;
  public readonly seconds: number;
  public readonly direction: DMSDirection;
}
