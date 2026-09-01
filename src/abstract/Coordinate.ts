import { CoordinateSystem } from './CoordinateSystem.js';


export abstract class Coordinate extends CoordinateSystem {
  public override readonly dimensions: number;
  public readonly systemName: string;

  protected constructor ( systemName: string, dimensions: number ) {
    super();

    this.systemName = systemName;
    this.dimensions = dimensions;
  }

  public abstract clone () : Coordinate;
  public abstract toJSON () : Record< string, unknown >;

  public override toString () : string {
    return `${ this.constructor.name }(${ JSON.stringify( this.toJSON() ) })`;
  }
}
