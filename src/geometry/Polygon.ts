import { Coordinate } from '../coordinate/Coordinate';
import { ProjectedCoordinate } from '../projection/ProjectedCoordinate';
import type { Ellipsoid } from '../crs/Ellipsoid';
import { WGS84 } from '../registry/ellipsoids';
import { deg2Rad, rad2Deg } from '../utils/math';
import { Point, type GeometryCoordinate } from './Point';
import { LineString } from './LineString';
import { BoundingBox } from './BoundingBox';


export class Polygon< T extends GeometryCoordinate = GeometryCoordinate > {
  public readonly outer: LineString< T >;
  public readonly holes: readonly LineString< T >[];

  public constructor ( outer: LineString< T >, holes: readonly LineString< T >[] = [] ) {
    if ( ! outer.isClosed ) throw new RangeError( 'Polygon outer ring must be closed' );
    for ( const hole of holes ) if ( ! hole.isClosed ) throw new RangeError( 'Polygon holes must be closed' );

    this.outer = outer.clone();
    this.holes = holes.map( hole => hole.clone() );
  }

  public clone () : Polygon< T > {
    return new Polygon( this.outer, this.holes );
  }

  public equals ( other: Polygon< T > ) : boolean {
    return this.outer.equals( other.outer ) && this.holes.length === other.holes.length &&
      this.holes.every( ( hole, index ) => hole.equals( other.holes[ index ] ) );
  }

  public get perimeter () : number {
    return this.outer.length + this.holes.reduce( ( total, hole ) => total + hole.length, 0 );
  }

  public get boundingBox () : BoundingBox< T > {
    return BoundingBox.fromPoints( [ ...this.outer.points, ...this.holes.flatMap( hole => hole.points ) ] );
  }

  public contains ( point: Point< T > ) : boolean {
    if ( ! this.containsRing( this.outer, point ) ) return false;
    return ! this.holes.some( hole => this.containsRing( hole, point ) );
  }
}
