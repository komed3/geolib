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

  private projectedArea () : number {
    return Math.abs( this.ringArea( this.outer ) - this.holes.reduce(
      ( total, hole ) => total + Math.abs( this.ringArea( hole ) ), 0
    ) );
  }

  private ringArea ( ring: LineString< T > ) : number {
    let area = 0;

    for ( let i = 1; i < ring.points.length; i++ ) {
      const a = ring.points[ i - 1 ].coordinate as ProjectedCoordinate;
      const b = ring.points[ i ].coordinate as ProjectedCoordinate;

      area += a.easting * b.northing - b.easting * a.northing;
    }

    return area / 2;
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

  public get area () : number {
    if ( this.outer.start.coordinate instanceof ProjectedCoordinate ) return this.projectedArea();
    return this.geographicArea( WGS84 );
  }

  public areaOn ( ellipsoid: Ellipsoid ) : number {
    if ( this.outer.start.coordinate instanceof ProjectedCoordinate ) return this.projectedArea();
    return this.geographicArea( ellipsoid );
  }

  public get centroid () : Point< T > {
    if ( this.outer.start.coordinate instanceof ProjectedCoordinate ) return this.projectedCentroid();
    return this.geographicCentroid();
  }
}
