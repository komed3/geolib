export type TDirection = 'north' | 'east' | 'south' | 'west';

export type TNotation = 'signed' | 'directional';

export type TDirectionMap = Partial< Record< TDirection, string > >;

export interface TDirectionStringOptions {
  locale?: string;
  precision?: number;
  delimiter?: string;
  showUnit?: boolean;
  dirMap?: TDirectionMap;
  notation?: TNotation;
}


export const DIRECTION_MAP_EN: TDirectionMap = { north: 'N', east: 'E', south: 'S', west: 'W' };
export const DIRECTION_MAP_DE: TDirectionMap = { north: 'N', east: 'O', south: 'S', west: 'W' };
