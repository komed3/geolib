export type TDirection = 'north' | 'east' | 'south' | 'west';

export type TDirectionMap = Partial< Record< TDirection, string > >;

export interface TAngleStringOptions {
  locale?: string;
  precision?: number;
  showUnit?: boolean;
  lang?: TDirectionMap;
  delimiter?: string;
}


export const DIRECTION_MAP: TDirectionMap = { north: 'N', east: 'E', south: 'S', west: 'W' };
