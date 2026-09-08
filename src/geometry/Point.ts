import type { Coordinate } from '../coordinate/Coordinate';
import { distance } from '../math/distance';
import { bearing } from '../math/bearing';
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
}
