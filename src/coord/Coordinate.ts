import { Utils } from '../lib/Utils';
import type { System } from './System';


export interface ICoordinate {
  readonly values: readonly number[];
  readonly system: System;
}
