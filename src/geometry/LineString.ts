import { GeometryCoordinate, Point } from './Point';


export class LineString< T extends GeometryCoordinate > {
  public readonly points: readonly Point< T >[];

  public constructor ( points: readonly Point< T >[] ) {
    if ( points.length < 2 ) throw new RangeError( 'LineString must contain at least two points' );
    this.points = points.map( point => point.clone() );
  }
}
