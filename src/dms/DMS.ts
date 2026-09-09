export type TDirection = 'north' | 'east' | 'south' | 'west';

export interface TAngleStringOptions {
  locale?: string;
  precision?: number;
  showUnit?: boolean;
  lang?: Partial< Record< TDirection, string > >;
  delimiter?: string;
}
