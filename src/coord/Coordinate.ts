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

  public get dimension () : number {
    return this.values.length;
  }

  public get ( index: number ) : Value {
    return this.values[ index ];
  }

  public toTuple () : number[] {
    return this.values.map( value => value.toNumber() );
  }

  public equals ( { system, values }: Coordinate ) : boolean {
    return this.system.equals( system ) && this.values.length === values.length &&
      this.values.every( ( value, i ) => value.equals( values[ i ] ) );
  }
}
