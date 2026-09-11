import type { Axis, TAxisOptions } from '../axis/Axis';
import type { AxisSet } from '../axis/AxisSet';


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

  public equals ( { name, axes }: System ) : boolean {
    return this.name === name && this.axes.equals( axes );
  }

  public clone () : System {
    return new System( this.name, this.axes.clone() );
  }

  public toJSON () : { name: string, axes: readonly TAxisOptions[] } {
    return { name: this.name, axes: this.axes.toJSON() };
  }

  public toString ( options?: TSystemStringOptions ) : string {
    return `${ this.name } (${ this.axes.toString( options ) })`;
  }
}
