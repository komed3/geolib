import { Coordinate } from '../coordinate/Coordinate';
import type { Ellipsoid } from '../crs/Ellipsoid';
import { ProjectedCoordinate } from '../projection/ProjectedCoordinate';
import { WGS84 } from '../registry/ellipsoids';
import { deg2Rad, rad2Deg } from '../utils/math';
import { BoundingBox } from './BoundingBox';
import { LineString } from './LineString';
import { Point, type GeometryCoordinate } from './Point';


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

  private geographicCentroid () : Point< T > {
    let x = 0, y = 0, z = 0, weight = 0;

    for ( const point of this.outer.points.slice( 0, -1 ) ) {
      const { latitude, longitude } = point.coordinate as Coordinate;
      const lat = deg2Rad( latitude.value ), lon = deg2Rad( longitude.value );
      const cosLat = Math.cos( lat );

      x += cosLat * Math.cos( lon );
      y += cosLat * Math.sin( lon );
      z += Math.sin( lat );
      weight++;
    }

    if ( weight === 0 ) throw new RangeError( 'Centroid is undefined for empty polygon' );

    x /= weight;
    y /= weight;
    z /= weight;

    const longitude = Math.atan2( y, x );
    const latitude = Math.atan2( z, Math.hypot( x, y ) );

    return new Point( Coordinate.fromDegrees( rad2Deg( latitude ), rad2Deg( longitude ) ) as T );
  }

  private containsRing ( ring: LineString< T >, point: Point< T > ) : boolean {
    if ( ! ( point.coordinate instanceof Coordinate ) || ! ( ring.start.coordinate instanceof Coordinate ) )
      if ( ! ( point.coordinate instanceof ProjectedCoordinate ) || ! ( ring.start.coordinate instanceof ProjectedCoordinate ) )
        throw new TypeError( 'Coordinates must use the same coordinate type' );

    let inside = false;
    const px = point.coordinate instanceof Coordinate ? point.coordinate.longitude.value : point.coordinate.easting;
    const py = point.coordinate instanceof Coordinate ? point.coordinate.latitude.value : point.coordinate.northing;

    for ( let i = 1; i < ring.points.length; i++ ) {
      const a = ring.points[ i - 1 ].coordinate;
      const b = ring.points[ i ].coordinate;

      const ax = a instanceof Coordinate ? a.longitude.value : a.easting;
      const ay = a instanceof Coordinate ? a.latitude.value : a.northing;
      const bx = b instanceof Coordinate ? b.longitude.value : b.easting;
      const by = b instanceof Coordinate ? b.latitude.value : b.northing;

      if ( ( ay > py ) !== ( by > py ) ) {
        const x = ( bx - ax ) * ( py - ay ) / ( by - ay ) + ax;

        if ( px < x ) inside = ! inside;
      }
    }

    return inside;
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
