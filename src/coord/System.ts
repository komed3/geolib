import type { Axis } from './Axis';
import type { AxisSet } from './AxisSet';


export interface TSystemStringOptions {
  showUnit?: boolean;
  delimiter?: string;
}


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

  public equals ( system: System ) : boolean {
    return this.name === system.name && this.axes.equals( system.axes );
  }

  public toString ( options: TSystemStringOptions = {} ) : string {
    return `${ this.name } (${ this.axes.toString( options ) })`;
  }
}
