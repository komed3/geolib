import type { System } from './System';
import type { Value, TValueStringOptions } from './Value';


export interface TCoordinateStringOptions extends TValueStringOptions {
  delimiter?: string;
}


export class Coordinate {
  public readonly system: System;
  public readonly values: readonly Value[];

  public constructor ( system: System, values: readonly Value[] ) {
    this.system = system, this.values = Object.freeze( [ ...values ] );
  }
}
