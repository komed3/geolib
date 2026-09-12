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

  public get dimension () : number {
    return this.values.length;
  }

  public get ( index: number ) : Value {
    return this.values[ index ];
  }

  public equals ( { system, values }: Coordinate ) : boolean {
    return this.system.equals( system ) && this.values.length === values.length &&
      this.values.every( ( value, i ) => value.equals( values[ i ] ) );
  }

  public clone () : Coordinate {
    return new Coordinate( {
      system: this.system.clone(),
      values: this.values.map( v => v.clone() )
    } );
  }

  public toTuple () : number[] {
    return this.values.map( v => v.value );
  }
}
