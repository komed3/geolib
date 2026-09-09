import type { TSystemStringOptions } from '../types/base';
import type { Axis } from './Axis';
import type { AxisSet } from './AxisSet';


export class System {
  public constructor (
    public readonly name: string,
    public readonly axes: AxisSet
  ) {}

  public get dimension () : number {
    return this.axes.dimension;
  }

  public get ( index: number ) : Axis | undefined {
    return this.axes.get( index );
  }

  public indexOf ( axis: Axis ) : number {
    return this.axes.indexOf( axis );
  }

  public equals ( { name, axes }: System ) : boolean {
    return this.name === name && this.axes.equals( axes );
  }

  public toString ( options?: TSystemStringOptions ) : string {
    return `${ this.name } (${ this.axes.toString( options ) })`;
  }
}
