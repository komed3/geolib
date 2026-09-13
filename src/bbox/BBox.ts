import { Coordinate, type CoordinateStringOptions } from '../coord';
import type { System } from '../system';


export interface BBoxOptions< T extends Coordinate = Coordinate > {
  min: T;
  max: T;
}

export interface BBoxStringOptions extends CoordinateStringOptions {
  format?: string;
}


export class BBox< T extends Coordinate = Coordinate > {
  protected static readonly factory = Coordinate.fromTuple.bind( Coordinate );

  public readonly min: T;
  public readonly max: T;

  public constructor ( { min, max }: BBoxOptions< T > ) {
    if ( min.system.equals( max.system ) === false )
      throw new TypeError( 'Bounding box system mismatch' );

    this.min = min, this.max = max;
  }

  public get system () : System {
    return this.min.system;
  }

  public get dimension () : number {
    return this.min.dimension;
  }

  public contains ( coordinate: T ) : boolean {
    if ( ! this.system.equals( coordinate.system ) ) return false;

    return coordinate.values.every( ( value, i ) =>
      value.value >= this.min.values[ i ].value &&
      value.value <= this.max.values[ i ].value
    );
  }

  public intersect ( bbox: BBox< T > ) : BBox< T > | null {
    if ( ! this.system.equals( bbox.system ) ) return null;

    const min = this.min.values.map( ( value, i ) =>
      Math.max( value.value, bbox.min.values[ i ].value )
    );

    const max = this.max.values.map( ( value, i ) =>
      Math.min( value.value, bbox.max.values[ i ].value )
    );

    if ( min.some( ( value, i ) => value > max[ i ] ) ) return null;

    const cls = this.constructor as new ( options: BBoxOptions< T > ) => BBox< T >;

    return new cls( {
      min: ( this.min.constructor as typeof Coordinate ).fromTuple( min, this.system ) as T,
      max: ( this.max.constructor as typeof Coordinate ).fromTuple( max, this.system ) as T
    } );
  }

  public equals ( { min, max }: BBox< T > ) : boolean {
    return this.min.equals( min ) && this.max.equals( max );
  }

  public clone () : this {
    const cls = this.constructor as new ( options: BBoxOptions< T > ) => this;
    return new cls( { min: this.min.clone() as T, max: this.max.clone() as T } );
  }

  public toTuple () : [ number[], number[] ] {
    return [ this.min.toTuple(), this.max.toTuple() ];
  }

  public toJSON () : { min: number[], max: number[], system: string } {
    return { min: this.min.toTuple(), max: this.max.toTuple(), system: this.system.name };
  }

  public toString ( { format = '[{min}] – [{max}]', ...options }: BBoxStringOptions = {} ) : string {
    return format.replaceAll( '{min}', this.min.toString( options ) )
      .replaceAll( '{max}', this.max.toString( options ) );
  }

  public static fromTuple ( this: typeof BBox, [ min, max ]: [ number[], number[] ], system: System ) : BBox {
    return new this( { min: this.factory( min, system ), max: this.factory( max, system ) } );
  }
}
