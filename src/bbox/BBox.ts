import type { AxisOptions } from '../axis';
import type { Coordinate, CoordinateStringOptions } from '../coord';
import type { System } from '../system';


export interface BBoxOptions< T extends Coordinate = Coordinate > {
  min: T;
  max: T;
}

export interface BBoxStringOptions extends CoordinateStringOptions {
  format?: string;
}


export class BBox< T extends Coordinate = Coordinate > {
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

    return coordinate.values.every( ( value, i ) => {
      const min = this.min.values[ i ].value;
      const max = this.max.values[ i ].value;

      return value.value >= min && value.value <= max;
    } );
  }

  public equals ( { min, max }: BBox< T > ) : boolean {
    return this.min.equals( min ) && this.max.equals( max );
  }

  public clone () : BBox< T > {
    return new BBox< T >( { min: this.min.clone() as T, max: this.max.clone() as T } );
  }

  public toJSON () : { min: number[], max: number[], system: { name: string, axes: readonly AxisOptions[] } } {
    return { min: this.min.toTuple(), max: this.max.toTuple(), system: this.system.toJSON() };
  }

  public toString ( { format = '[$1] – [$2]', ...options }: BBoxStringOptions = {} ) : string {
    return format.replaceAll( '$1', this.min.toString( options ) ).replaceAll( '$2', this.max.toString( options ) );
  }
}
