import type { Axis, AxisSet } from '../axis';


export interface SystemOptions {
  name: string;
  axes: AxisSet;
}


export class System {
  public readonly name: string;
  public readonly axes: AxisSet;

  public constructor ( { name, axes }: SystemOptions ) {
    this.name = name, this.axes = axes;
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
}
