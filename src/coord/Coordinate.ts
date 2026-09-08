import { Utils } from '../lib/Utils';
import type { System } from './System';


export interface ICoordinate {
  readonly values: readonly number[];
  readonly system: System;
}


export class Coordinate implements ICoordinate {
  public readonly values: readonly number[];
  public readonly system: System;

  public constructor ( { values, system }: ICoordinate ) {
    this.values = Object.freeze( [ ...values ] );
    this.system = system;
  }
}
