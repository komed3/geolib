import { Axis } from './Axis';


export interface AxisSetOptions {
  axes: ReadonlyArray< Axis >;
}


export class AxisSet {
  public readonly axes: ReadonlyArray< Axis >;

  public constructor ( { axes }: AxisSetOptions ) {
    this.axes = Object.freeze( [ ...axes ] );
  }

  public get dimension () : number {
    return this.axes.length;
  }

  public get ( index: number ) : Axis {
    return this.axes[ index ];
  }

  public indexOf ( axis: Axis ) : number {
    return this.axes.findIndex( a => a.equals( axis ) );
  }

  public has ( axis: Axis ) : boolean {
    return this.indexOf( axis ) !== -1;
  }
}
