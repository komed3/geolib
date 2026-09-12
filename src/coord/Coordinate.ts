import type { System } from '../system';
import type { Value } from '../value';


export interface CoordinateOptions {
  system: System;
  values: ReadonlyArray< Value >;
}


export class Coordinate {
  public readonly system: System;
  public readonly values: ReadonlyArray< Value >;

  public constructor ( { system, values }: CoordinateOptions ) {
    if ( system.dimension !== values.length ) throw new TypeError( 'Coordinate dimension mismatch' );
    this.system = system, this.values = Object.freeze( [ ...values ] );
  }
}
