import { GeometryCoordinate, Point } from './Point';


export class LineString< T extends GeometryCoordinate > {
  public readonly points: readonly Point< T >[];

  public constructor ( points: readonly Point< T >[] ) {
    if ( points.length < 2 ) throw new RangeError( 'LineString must contain at least two points' );
    this.points = points.map( point => point.clone() );
  }

  public get length () : number {
    let total = 0;

    for ( let i = 1; i < this.points.length; i++ )
      total += this.points[ i - 1 ].distanceTo( this.points[ i ] );

    return total;
  }

  public get start () : Point< T > {
    return this.points[ 0 ];
  }

  public get end () : Point< T > {
    return this.points[ this.points.length - 1 ];
  }

  public get isClosed () : boolean {
    return this.start.equals( this.end );
  }
}
