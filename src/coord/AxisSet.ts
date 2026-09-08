import { Axis } from './Axis';


export class AxisSet {
  public readonly axes: readonly Axis[];

  public constructor ( axes: readonly Axis[] ) {
    this.axes = Object.freeze( [ ...axes ] );
  }

  public get dimension () : number {
    return this.axes.length;
  }

  public get ( index: number ) : Axis | undefined {
    return this.axes[ index ];
  }

  public indexOf ( axis: Axis ) : number {
    return this.axes.indexOf( axis );
  }

  public has ( axis: Axis ) : boolean {
    return this.indexOf( axis ) !== -1;
  }

  public equals ( axes: AxisSet ) : boolean {
    return this.dimension === axes.dimension && this.axes.every(
      ( axis, i ) => axis.equals( axes.axes[ i ] )
    );
  }

  public toArray () : readonly Axis[] {
    return this.axes;
  }
}
