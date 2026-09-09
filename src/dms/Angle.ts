export type TDirection = 'north' | 'east' | 'south' | 'west';

export type TNotation = 'signed' | 'directional';

export type TDirectionMap = Partial< Record< TDirection, string > >;

export interface TAngleStringOptions {
  locale?: string;
  precision?: number;
  delimiter?: string;
  showUnit?: boolean;
  dirMap?: TDirectionMap;
  notation?: TNotation;
}


export const DIRECTION_MAP: TDirectionMap = { north: 'N', east: 'E', south: 'S', west: 'W' };
