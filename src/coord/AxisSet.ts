import type { Axis } from './Axis';


export interface TAxisSetStringOptions {
  showUnit?: boolean;
  delimiter?: string;
}


export class AxisSet {
  public readonly axes: readonly Axis[];

  public constructor ( axes: readonly Axis[] ) {
    this.axes = Object.freeze( [ ...axes ] );
  }

  public get dimension () : number {
    return this.axes.length;
  }

  public get ( index: number ) : Axis {
    return this.axes[ index ];
  }

  public indexOf ( axis: Axis ) : number {
    return this.axes.findIndex( item => item.equals( axis ) );
  }

  public has ( axis: Axis ) : boolean {
    return this.indexOf( axis ) !== -1;
  }

  public equals ( axes: AxisSet ) : boolean {
    return this.axes.length === axes.axes.length && this.axes.every(
      ( axis, i ) => axis.equals( axes.axes[ i ] )
    );
  }

  public toArray () : readonly Axis[] {
    return this.axes;
  }

  public toString ( { delimiter = ', ', ...options }: TAxisSetStringOptions = {} ) : string {
    return this.axes.map( axis => axis.toString( options ) ).join( delimiter );
  }

  public [ Symbol.iterator ] () : Iterator< Axis > {
    return this.axes[ Symbol.iterator ]();
  }
}
