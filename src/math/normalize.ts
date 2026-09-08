import { clamp } from './clamp';
import { wrap } from './wrap';


export type NormalizationMode = 'none' | 'clamp' | 'wrap';

export interface NormalizeConfig {
  mode?: NormalizationMode
  min?: number
  max?: number
}


export function normalize ( value: number, { mode, min = -Infinity, max = Infinity }: NormalizeConfig = {} ) : number {
  switch ( mode ) {
    case 'clamp': return clamp( value, min, max );
    case 'wrap': return wrap( value, min, max );

    default: return value;
  }
}
