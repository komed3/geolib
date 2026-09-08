import { Coordinate } from '../coordinate/Coordinate';
import { bearing } from '../math/bearing';
import { distance } from '../math/distance';
import type { ProjectedCoordinate } from '../projection/ProjectedCoordinate';


export type GeometryCoordinate = Coordinate | ProjectedCoordinate;


export class Point< T extends GeometryCoordinate = GeometryCoordinate > {
  public constructor ( public readonly coordinate: T ) {}

  public clone () : Point< T > {
    return new Point( this.coordinate.clone() as T );
  }

  public equals ( other: Point< T > ) : boolean {
    return this.coordinate.equals( other.coordinate );
  }

  public distanceTo ( other: Point< T > ) : number {
    return distance( this.coordinate, other.coordinate );
  }

  public bearingTo ( other: Point< T > ) : number {
    if (
      ! ( this.coordinate instanceof Coordinate ) ||
      ! ( other.coordinate instanceof Coordinate )
    )
      throw new TypeError( 'Bearing requires geographic coordinates' );

    return bearing( this.coordinate, other.coordinate );
  }

  public toString () : string {
    return this.coordinate.toString();
  }
}
