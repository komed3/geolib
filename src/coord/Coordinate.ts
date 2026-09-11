import type { System } from '../system/System';
import { type TValueStringOptions, Value } from '../value/Value';


export interface TCoordinateStringOptions extends TValueStringOptions {
  delimiter?: string;
}


export class Coordinate {
  public readonly system: System;
  public readonly values: readonly Value[];

  public constructor ( system: System, values: readonly Value[] ) {
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
    return new Coordinate( this.system.clone(), this.values.map( value => value.clone() ) );
  }

  public toTuple () : number[] {
    return this.values.map( value => value.toNumber() );
  }

  public toJSON () : { system: string, values: readonly number[] } {
    return { system: this.system.name, values: this.toTuple() };
  }

  public toString ( { delimiter = ', ', ...options }: TCoordinateStringOptions = {} ) : string {
    return this.values.map( value => value.toString( options ) ).join( delimiter );
  }

  public static fromTuple ( tuple: readonly number[], system: System ) : Coordinate {
    const values = tuple.map( ( value, i ) => new Value( value, system.axes.get( i ) ) );
    return new Coordinate( system, values );
  }
}
