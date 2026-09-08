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

  private projectedCentroid () : Point< T > {
    const rings = [ this.outer, ...this.holes ];
    let area = 0, x = 0, y = 0;

    for ( const ring of rings ) {
      const signedArea = this.ringArea( ring );
      let ringX = 0, ringY = 0;

      for ( let i = 1; i < ring.points.length; i++ ) {
        const a = ring.points[ i - 1 ].coordinate as ProjectedCoordinate;
        const b = ring.points[ i ].coordinate as ProjectedCoordinate;
        const cross = a.easting * b.northing - b.easting * a.northing;

        ringX += ( a.easting + b.easting ) * cross;
        ringY += ( a.northing + b.northing ) * cross;
      }

      const factor = 1 / ( 6 * signedArea );

      x += ringX * factor * signedArea;
      y += ringY * factor * signedArea;
      area += signedArea;
    }

    if ( area === 0 ) throw new RangeError( 'Centroid is undefined for zero-area polygon' );
    return new Point( new ProjectedCoordinate( x / area, y / area ) as T );
  }

  private geographicArea ( ellipsoid: Ellipsoid ) : number {
    const radius = ellipsoid.semiMajorAxis, rings = [ this.outer, ...this.holes ];
    let area = 0;

    for ( const ring of rings ) {
      let ringArea = 0;

      for ( let i = 1; i < ring.points.length; i++ ) {
        const a = ring.points[ i - 1 ].coordinate as Coordinate;
        const b = ring.points[ i ].coordinate as Coordinate;

        const lat1 = deg2Rad( a.latitude.value ), lat2 = deg2Rad( b.latitude.value );
        const lon1 = deg2Rad( a.longitude.value ), lon2 = deg2Rad( b.longitude.value );

        ringArea += ( lon2 - lon1 ) * ( 2 + Math.sin( lat1 ) + Math.sin( lat2 ) );
      }

      area += ringArea;
    }

    return Math.abs( area * radius ** 2 / 4 );
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
