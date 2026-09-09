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
  public constructor () {}
}
