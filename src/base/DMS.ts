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


export class DMS {
  public constructor () {}
}
