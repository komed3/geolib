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

  public get dimension () : number {
    return this.values.length;
  }

  public get ( index: number ) : number | undefined {
    return this.values[ index ];
  }

  public with ( index: number, value: number ) : Coordinate {
    const values = [ ...this.values ];
    values[ index ] = value;

    return new Coordinate( { values, system: this.system } );
  }

  public map ( callback: ( value: number, index: number ) => number ) : Coordinate {
    return new Coordinate( { values: this.values.map( callback ), system: this.system } );
  }

  public normalize () : Coordinate {
    return this.map( ( value, i ) => this.system.get( i )?.normalize( value ) ?? value );
  }

  public clamp () : Coordinate {
    return this.map( ( value, i ) => this.system.get( i )?.clamp( value ) ?? value );
  }

  public valid () : boolean {
    return this.values.every( ( value, i ) => this.system.get( i )?.contains( value ) ?? false );
  }

  public equals ( coordinate: Coordinate, tolerance = 0 ) : boolean {
    return this.system.equals( coordinate.system ) && this.values.length === coordinate.values.length &&
      this.values.every( ( value, index ) => tolerance > 0
        ? Utils.approximatelyEqual( value, coordinate.values[ index ], tolerance )
        : value === coordinate.values[ index ]
      );
  }
}
