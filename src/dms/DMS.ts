export type TDirection = 'north' | 'east' | 'south' | 'west';

export interface TDMSStringOptions {
  locale?: string;
  precision?: number;
  showUnit?: boolean;
  lang?: Partial< Record< TDirection, string > >;
  delimiter?: string;
}


export class DMS {
  public readonly degrees: number;
  public readonly minutes: number;
  public readonly seconds: number;
  public readonly direction: TDirection | null;
}
