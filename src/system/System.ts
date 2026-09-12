import type { Axis, AxisOptions, AxisSet } from '../axis';


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

  public equals ( { name, axes }: System ) : boolean {
    return this.name === name && this.axes.equals( axes );
  }

  public clone () : System {
    return new System( { name: this.name, axes: this.axes.clone() } );
  }

  public toJSON () : { name: string, axes: ReadonlyArray< AxisOptions > } {
    return { name: this.name, axes: this.axes.toJSON() };
  }
}
