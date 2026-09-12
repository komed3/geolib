import type { System } from '../system';
import type { Value, ValueStringOptions } from '../value';


export type CoordinateOrthant = Array< 1 | 0 | -1 >;

export interface CoordinateOptions {
  system: System;
  values: ReadonlyArray< Value >;
}

export interface CoordinateStringOptions extends ValueStringOptions {
  delimiter?: string;
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

  public orthant () : CoordinateOrthant {
    return this.values.map( v => v.value === 0 ? 0 : v.value < 0 ? -1 : 1 );
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

  public toJSON () : { system: string, values: readonly number[] } {
    return { system: this.system.name, values: this.toTuple() };
  }

  public toString ( { delimiter = ', ', ...options }: CoordinateStringOptions = {} ) : string {
    return this.values.map( v => v.toString( options ) ).join( delimiter );
  }
}
