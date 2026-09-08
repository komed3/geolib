import type { Axis } from './Axis';
import { AxisSet } from './AxisSet';


export interface TSystem {
  readonly name?: string;
  readonly type?: string;
  readonly axes: AxisSet | readonly Axis[];
}


export class System {
  public readonly name?: string;
  public readonly type?: string;
  public readonly axes: AxisSet;

  public constructor ( { name, type, axes }: TSystem ) {
    this.name = name, this.type = type;
    this.axes = axes instanceof AxisSet ? axes : new AxisSet( axes );
  }

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
    return this.name === system.name && this.type === system.type && this.axes.equals( system.axes );
  }

  public toString () : string {
    return this.name ? `${ this.name } (${ this.axes })` : this.axes.toString();
  }
}
